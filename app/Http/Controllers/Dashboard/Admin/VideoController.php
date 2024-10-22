<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

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
}
