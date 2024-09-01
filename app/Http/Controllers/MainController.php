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

        $video = new Video();

        $sliderParams[] = $request->all();
        $sliderParams['orderBy'] = 'slider';
        $popularParams[] = $request->all();
        $popularParams['orderBy'] = 'popular';

        $data['user'] = Auth::user();
        $data['location'] = $location;
        $data['locations'] = $this->getLocations();
        $data['categories'] = $this->getCategories();
        $data['videos'] = [
            'slider' => $video->getVideos($sliderParams),
            'popular' => $video->getVideos($popularParams),
            'recommended' => $video->getVideos($request)
        ];

        return response($data);
    }
    public function getVideos(Request $request)
    {
        $video = new Video();
        $videos = $video->getVideos($request->all());
        return response($videos);
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
