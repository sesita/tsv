<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use App\Models\View;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function getStats()
    {
        $stats = [];

        $stats['users'] = User::count();
        $stats['views'] = View::count();
        $stats['comments'] = Comment::count();

        $stats['videos']['total'] = Video::count();
        $stats['videos']['new'] = Video::whereBetween('created_at', [
            Carbon::now()->subDays(7),
            Carbon::now(),
        ])->count();

        return response($stats);
    }

    public function getVideos(Request $request)
    {
        $perPage = 8;
        $query = $request->query('query', '');
        $videos = Video::orderBy('status', 'desc')->where('title', 'like', '%' . $query . '%')->paginate($perPage);
        return response()->json([
            'videos' => $videos->items(),
            'totalPages' => $videos->lastPage(),
        ]);
    }

    public function updateCategory(Request $request)
    {
        if ($request->id) {
            $category = Category::find($request->id);
            if ($category) {
                $category->title = $request->title;
                $category->save();
                return response()->json($category);
            }
            return response()->json(['status' => 'error', 'message' => 'Category not found'], 404);
        } else {
            $category = new Category();
            $category->title = $request->title;
            $category->save();
            return response()->json($category, 201);
        }
    }
    public function deleteCategory(Request $request)
    {
        Category::find($request->id)->delete();
        return response(['status' => 'success']);
    }

    public function acceptVideo(Request $request)
    {
        Video::find($request->id)->update(['status' => 'active']);
        return response(['status' => 'success']);
    }
}
