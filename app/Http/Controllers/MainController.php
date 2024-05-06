<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\User;
use App\Models\Video;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function getVideos(Request $request)
    {
        $paginate = $request->paginate ?? 15;
        $orderBy = $request->orderBy ?? 'id';
        $search = $request->search ?? null;
        $tag = $request->tag ?? [];

        $query = Video::query();

        if ($orderBy == 'popular') {
            $query->orderBy('views', 'desc');
        } else {
            $query->orderBy('id', 'desc');
        }


        if ($search) {
            $query->where(function ($q) use ($search){ 
                $q->where('title', 'like', "%{$search}%")->orwhereHas('category', function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%");
                });
            });
        }

        // if($tag) {
        //     if(!is_array($tag)) $tag = [$tag];
        //     $query->whereHas('tags', function ($query) use ($tag) {
        //         $query->whereIn('tags.id', $tag);
        //     });
        // }

        $list = $query->with('category')->paginate($paginate);

        return response($list);
    }
    public function getUser(Request $request)
    {

        $request->validate([
            'id' => 'required|integer',
        ]);

        $res = User::where('id', $request->id)->first();

        return response($res);
    }
    public function getCategories(Request $request)
    {
        $res = Category::withCount('videos')->orderBy('videos_count', 'desc')->get();
        return response($res);
    }
    public function getTags(Request $request)
    {
        $res = Tag::withCount('videos')->orderBy('videos_count', 'desc')->get();
        return response($res);
    }
}
