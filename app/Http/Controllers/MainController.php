<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Video;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MainController extends Controller
{
    public function primary(Request $request){

        $data['user'] = Auth::user() ?? null;
        
        $location = Session::get('location') ? json_decode(Session::get('location')) : Location::location($request->ip());

        if($location){
            Session::put('location', json_encode($location));
        }

        $data['location'] = $location;
        $data['locations'] = $this->getLocations();
        $data['categories'] = $this->getCategories();
        $data['videos'] = [
            'slider' => $this->getVideos($request),
            'popular' => $this->getVideos($request),
            'recommended' => $this->getVideos($request)
        ];

        return response($data);
    }
    public function getVideos(Request $request)
    {
        $paginate = $request->paginate ?? 8;
        $orderBy = $request->orderBy ?? 'id';
        $search = $request->search ?? null;

        $query = Video::withCount('views');

        if ($orderBy == 'popular') {
            $query->orderBy('views_count', 'desc');
        } else {
            $query->orderBy('id', 'desc');
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")->orwhereHas('category', function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%");
                });
            });
        }
        
        $list = $query->with(['category', 'user'])->paginate($paginate);

        return $list;
    }
    public function getUser(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $res = User::where('id', $request->id)->first();

        return response($res);
    }
    public function getCategories()
    {
        $res = Category::withCount('videos')->orderBy('videos_count', 'desc')->get();
        return $res;
    }
    public function getLocations($parent = null)
    {
        $query = Location::with('parent');

        if($parent){
            $query->where('parent_id', $parent);
        } else {
            $query->where('parent_id', null);
        }

        $locations = $query->pluck('title', 'id');

        return $locations;
    }

    public function updateLocation(Request $request)
    {
 
        return response();
    }
}
