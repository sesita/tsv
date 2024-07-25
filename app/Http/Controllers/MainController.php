<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
use App\Models\Tag;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function getVideos(Request $request)
    {
        $paginate = $request->paginate ?? 15;
        $orderBy = $request->orderBy ?? 'id';
        $search = $request->search ?? null;
        $tag = $request->tag ?? [];

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

        if ($tag) {
            if (!is_array($tag)) {
                $tag = [$tag];
            }

            $query->whereHas('tags', function ($query) use ($tag) {
                $query->whereIn('tags.id', $tag);
            });
        }

        $list = $query->with(['category', 'user'])->paginate($paginate);

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
    public function getLocations(Request $request, $parent = null)
    {
        $query = Location::with('parent');

        if($parent){
            $query->where('parent_id', $parent);
        } else {
            $query->where('parent_id', null);
        }

        $locations = $query->pluck('title', 'id');

        return response()->json($locations);
    }

}
