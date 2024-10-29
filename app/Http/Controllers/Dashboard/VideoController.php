<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\View;
use App\Models\Video;
use App\Models\Location;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $query = Video::with('user')->latest();

        if ($search) {
            $query->search($search);
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

        $status = 'waiting';
        if ($request->file('video')) {
            $videoName = 'videos/' . Str::random() . time() . '.mp4';
            $request->video->move(public_path('storage/videos'), $videoName);
            $status = 'unpaid';
        } else {
            $videoName = $request->iframe;
        }

        if ($request->promoted) {
            $status = 'unpaid';
        }

        if ($request->file('thumbnail')) {
            $thumbnail = 'thumbnails/' . Str::random() . time() . '.webp';
            $request->thumbnail->move(public_path('storage/thumbnails'), $thumbnail);
        }

        $slug = Str::slug($request->title);
        $counter = 1;
        do {
            $videoSlug = $counter > 1 ? $slug . '-' . $counter : $slug;
            $counter++;
        } while (Video::where('slug', $videoSlug)->exists());

        if ($request->location) {
            $location = Location::find($request->location);
        }

        $video = Video::create([
            'slug' => $videoSlug,
            'video' => $videoName,
            'user_id' => $userId,
            'title' => $request->title,
            'price' => $request->price,
            'thumbnail' => $thumbnail ?? null,
            'status' => $status,
            'category_id' => $request->category,
            'location_id' => $location->id ?? 1,
            'description' => $request->description,
        ]);

        return response(['status' => 'success', 'message' => 'Video Uploaded Successfully']);
    }
    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required|integer|max:3',
            'description' => 'required',
            'category_id' => 'required',
        ]);

        if ($request->file('thumbnail')) {
            $thumbnail = 'thumbnails/' . Str::random() . time() . '.webp';
            $request->thumbnail->move(public_path('storage/thumbnails'), $thumbnail);
        }

        $updateData = [
            'title' => $request->title,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'location_id' => $request->location_id,
            'description' => $request->description,
        ];

        if (isset($thumbnail)) {
            $updateData['thumbnail'] = $thumbnail;
        }

        $video = Video::where('id', $request->id)->firstOrFail();
        $video->update($updateData);

        return response(['status' => 'success', 'message' => 'Video Updated Successfully']);
    }
    public function views($id, Request $request)
    {
        $views = View::getViewsForPeriod($id, $request->period);
        return response($views);
    }
}
