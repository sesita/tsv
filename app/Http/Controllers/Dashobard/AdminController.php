<?php

namespace App\Http\Controllers\Dashobard;

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

    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }
    public function getVideos()
    {
        $videos = Video::paginate(9);
        return response()->json($videos);
    }

    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $request->id,
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 400);
        }

        if ($request->id) {
            $user = User::find($request->id);
            if ($user) {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->save();
                return response()->json($user);
            }
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        } else {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt('defaultpassword'); // or generate a random password
            $user->save();
            return response()->json($user, 201);
        }
    }

    public function deleteUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 400);
        }

        $user = User::find($request->id);
        if ($user) {
            $user->delete();
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
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
}
