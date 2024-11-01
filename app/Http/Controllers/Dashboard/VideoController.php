<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\Video\Package;
use App\Models\View;
use App\Models\Video;
use App\Models\Location;
use App\Enums\Video\Status;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = Status::WAITING->value;

        $query = Video::with('user')->orderByRaw("status = {$status} DESC")->latest();

        if ($search) {
            $query->search($search);
        }

        if (!Auth::user()->admin) {
            $query->where('user_id', Auth::user()->id);
        }

        $videos = $query->paginate(9);

        return response()->json($videos);
    }
    public function show($id)
    {
        $video = Video::find($id);
        return response()->json($video);
    }
    public function store(Request $request)
    {
        $userId = Auth::user()->id;
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|integer|max:3',
            'video' => 'nullable|mimes:mp4,mov,ogg,webm',
            'thumbnail' => 'required',
            'category' => 'required',
        ]);

        $status = Status::WAITING;
        $package = Package::FREE;

        if ($request->file('video')) {
            $videoName = 'videos/' . Str::random() . time() . '.mp4';
            $request->video->move(public_path('storage/videos'), $videoName);
            $status = Status::UNPAID;
        } else {
            $videoName = $request->video;
        }

        if ($request->promoted) {
            $package = Package::STANDARD;
        }

        $video = new Video();

        if ($request->file('thumbnail')) {
            $thumbnail = $video->generateImage($request->file('thumbnail'));
        }

        $slug = Str::slug($request->title);
        $counter = 1;
        do {
            $videoSlug = $counter > 1 ? $slug . '-' . $counter : $slug;
            $counter++;
        } while (Video::withTrashed()->where('slug', $videoSlug)->exists());

        if ($request->location) {
            $location = Location::find($request->location);
        }

        $video = Video::updateOrCreate([
            'id' => $request->id
        ],[
            'slug' => $videoSlug,
            'video' => $videoName,
            'user_id' => $userId,
            'title' => $request->title,
            'price' => $request->price,
            'thumbnail' => $thumbnail ?? null,
            'status' => $status,
            'package' => $package,
            'category_id' => $request->category,
            'location_id' => $location->id ?? 1,
            'description' => $request->description,
        ]);

        return response()->json($video);
    }
    public function views($id, Request $request)
    {
        $views = View::getViewsForPeriod($id, $request->period);
        return response($views);
    }
}
