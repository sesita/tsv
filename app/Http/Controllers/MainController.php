<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
use App\Models\Review;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MainController extends Controller
{
    public function primary(Request $request)
    {

        $data['user'] = Auth::user() ?? null;

        $location = Session::get('location') ? json_decode(Session::get('location')) : Location::location($request->ip());

        if ($location) {
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
            'recommended' => $video->getVideos($request),
        ];

        return response($data);
    }
    public function getVideos(Request $request)
    {
        $video = new Video();
        $videos = $video->getVideos($request->all());
        $common = $video->getVideos($request->all());
        return response(compact('videos', 'common'));
    }
    public function getUser(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $res['user'] = User::where('id', $request->id)->first();
        $res['videos'] = Video::with('user')->withCount('views')->published()->where('user_id', $res['user']->id)->orderBy('views_count', 'desc')->take(3)->get();
        $res['reviews'] = Review::where('user_id', $res['user']->id)->latest()->get();
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

        if ($parent) {
            $query->where('parent_id', $parent);
        } else {
            $query->where('parent_id', null);
        }

        $locations = $query->pluck('title', 'id');

        return $locations;
    }
    public function addReview(Request $request)
    {
        $request->validate([
            'name' => 'string|required|min:3',
            'user' => 'required|exists:users,id'
        ]);

        $res = Review::create([
            'name' => $request->name,
            'user_id' => $request->user,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        return response($res);
    }
    public function updateLocation(Request $request)
    {

        return response();
    }
}
