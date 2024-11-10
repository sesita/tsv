<?php

namespace App\Http\Controllers\Main;

use App\Models\User;
use App\Models\View;
use App\Models\Video;
use App\Models\Review;
use App\Models\Setting;
use App\Models\Category;
use App\Models\Location;
use App\Models\Interaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MainController extends Controller
{
    public function primary(Request $request)
    {
        $data['user'] = Auth::user() ?? null;    

        $video = new Video();

        $data['user'] = Auth::user();
        $data['location'] = $this->resolveLocation('174.216.209.125');
        $data['locations'] = $this->getLocations();
        $data['categories'] = $this->getCategories();
        $data['videos'] = [
            'slider' => $video->getVideos($request),
            'popular' => $video->getVideos($request),
            'recommended' => $video->getVideos($request),
        ];
        $data['settings'] = Setting::all()->pluck('value', 'name');
        $data['settings']['logo'] = isset($data['settings']['logo']) ? asset('storage/' . $data['settings']['logo']) : null;
        $data['settings']['favicon'] = isset($data['settings']['favicon']) ? asset('storage/' . $data['settings']['favicon']) : null;        

        return response($data);
    }
    public function getVideos(Request $request)
    {
        $video = new Video();
        $videos = $video->getVideos($request);
        return response($videos);
    }
    public function getVideo($slug, Request $request)
    {
        $video = Video::with([
            'comments' => function ($query) {
                $query->with('replies');
                $query->where('parent_id', null);
            },
            'user:avatar,name,id',
            'category',
        ])->where('slug', $slug)->first();

        if ($video->id) {
            $view = new View();
            $view->setView($video->id, $request->ip());
        }

        if (Auth::user()) {
            $interaction = Interaction::where('user_id', Auth::user()->id)->where('video_id', $video->id)->first();
            if ($interaction)
                $video['interaction'] = $interaction->is_liked ? 'like' : 'dislike';
        } else {
            $video['interaction'] = false;
        }

        return response()->json($video);
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
    public static function resolveLocation($ip){
        $location = Session::get('location') ? json_decode(Session::get('location')) : Location::location($ip);

        if ($location) {
            Session::put('location', json_encode($location));
        }
        return $location;
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
        $request->validate([
            'state' => 'required|string',
            'city' => 'required|string',
        ]);
    
        Session::put('location', json_encode($request->only(['state', 'city'])));
        return response()->json(['message' => 'Location updated successfully']);
    }
}
