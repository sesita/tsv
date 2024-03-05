<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{
    public function getVideo($slug)
    {
        $res = Video::with([
            'comments' => function ($query) {
                $query->where('parent_id', null);
            },
            'user:avatar,name,id',
            'category',
        ])->where('slug', $slug)->first();

        return $res;
    }
    public function addComment(Request $request)
    {

        $request->validate([
            'video_id' => 'required|integer',
            'comment' => 'required|string',
        ]);

        Comment::create([
            'video_id' => $request->video_id,
            'user_id' => Auth::user()->id,
            'comment' => $request->comment,
        ]);

        return response(['status' => 'success']);
    }
    public function deleteComment(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|integer',
        ]);
        Comment::where('id', $request->comment_id)->delete();
        return response(['status' => 'success']);
    }
    public function setView(Request $request)
    {
        $request->validate([
            'video_id' =>'required|integer',
        ]);
        Video::where('id', $request->video_id)->increment('views');
        return response(['status' =>'success']);
    }
}
