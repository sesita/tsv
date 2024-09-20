<?php

namespace App\Http\Controllers\Dashobard;

use App\Models\User;
use App\Models\Video;
use App\Models\Location;
use App\Models\View;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function MyVideo($id){
        $video = Video::find($id);
        return response($video);
    }
    public function MyVideos(Request $request){
        $perPage = 8;
        $userId = Auth::user()->id;
        $query = $request->query('query', '');
        $order = $request->query('order', 'id');
    
        $videos = Video::with('user')
            ->where('user_id', $userId)
            ->where('title', 'like', '%' . $query . '%')
            ->orderBy($order, 'desc')
            ->paginate($perPage);
    
        return response()->json([
            'videos' => $videos->items(),
            'totalPages' => $videos->lastPage(),
        ]);
    }
    public function VideoViews($id, Request $request){
        $views = View::getViewsForPeriod($id, $request->period);
        return response($views);
    }
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
            'price' =>'required|integer|max:3',
            'video' =>'nullable|mimes:mp4,mov,ogg,webm',
            'thumbnail' =>'required',
            'category' =>'required',
        ]);

        if($request->file('video')){   
            $videoName = 'videos/'. Str::random(). time(). '.mp4';
            $request->video->move(public_path('storage/videos'), $videoName);
        } else {
            $videoName = $request->iframe;
        }

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

        if($request->location){
            $location = Location::find($request->location);
        }

        $video = Video::create([
            'slug' => $videoSlug,
            'video' => $videoName,
            'user_id' => $userId,
            'title' => $request->title,
            'price' => $request->price,
            'thumbnail' => $thumbnail ?? null,
            'status' => 'waiting',
            'category_id' => $request->category,
            'location_id' => $location->id ?? 1,
            'description' => $request->description,
        ]);

        return response(['status' =>'success', 'message'=> 'Video Uploaded Successfully']);
    }

    public function UpdateVideo(Request $request){
        $request->validate([
            'title' =>'required',
            'price' =>'required|integer|max:3',
            'description' =>'required',
            'category_id' =>'required',
        ]);

        if($request->file('thumbnail')){
            $thumbnail = 'thumbnails/'. Str::random(). time(). '.webp';
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

        return response(['status' =>'success', 'message'=> 'Video Updated Successfully']);
    }

    public function Checkout(Request $request){
        //one time payment
        $price_ids = ['price_1OtHN8B9uNXBCzh8jLbp55iv' => 1];

        if($request->promoted){
            //Subscription $99/monthly
            // $price_ids['price_1OtHpWB9uNXBCzh8HQqQhzCq'] = 1;
        }

 
        $checkoutSession = $request->user()->checkout($price_ids, [
            'success_url' => 'https://mytsv.com/success',
            'cancel_url' => 'https://mytsv.com/',
        ]);
    
        return response()->json(['url' => $checkoutSession->url]);
    }
}
