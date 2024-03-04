<?php

namespace App\Http\Controllers\Dashobard;

use App\Models\User;
use App\Models\Video;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function Settings(Request $request){
        $userId = Auth::user()->id;
        $request->validate([
            'name' => 'required',
            'full_name' => 'required',
            'email' => 'required|email|unique:users,email,' . $userId,
        ]);

        if ($request->hasFile('avatar')) {
            $request->validate([
                'avatar' => 'mimes:jpg,png,webp,gif|max:2048',
            ]);
            $name = 'avatars/' . Str::random() . time() . '.webp';
            $request->avatar->move(public_path('storage/avatars'), $name);
            $avatar = $name;
        } else {
            $avatar = $request->avatar ?? null;
        }

        User::where('id', $userId)->update([
            'name' => $request->name,
            'email' => $request->email,
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
            'additional_info' => json_encode($request->additional_info),
            'avatar' => $avatar,
        ]);

        $user = User::where('id', $userId)->first();

        return response($user);
    }
    public function UploadVideo(Request $request){
        $userId = Auth::user()->id;
        $request->validate([
            'title' =>'required',
            'description' =>'required',
            'video' =>'required|mimes:mp4,mov,ogg,webm',
            'thumbnail' =>'required',
            'category' =>'required',
        ]);

        $videoName = 'videos/'. Str::random(). time(). '.mp4';
        $request->video->move(public_path('storage/videos'), $videoName);

        if($request->file('thumbnail')){
            $thumbnail = 'thumbnails/'. Str::random(). time(). '.webp';
            $request->thumbnail->move(public_path('storage/thumbnails'), $thumbnail);
        }

        $slug = Str::slug($request->title);
        $counter = 1;
        do {
            $videoSlug = $counter > 1 ? $slug . '-' . $counter : $slug;
            $counter++;
        } while (Video::where('slug', $videoSlug)->exists());

        Video::create([
            'views' => 0,
            'slug' => $videoSlug,
            'video' => $videoName,
            'user_id' => $userId,
            'category_id' => $request->category,
            'thumbnail' => $thumbnail ?? null,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response(['status' =>'success', 'message'=> 'Video Uploaded Successfully']);
    }
}
