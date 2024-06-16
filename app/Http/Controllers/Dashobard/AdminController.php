<?php

namespace App\Http\Controllers\Dashobard;

use Carbon\Carbon;
use App\Models\User;
use App\Models\View;
use App\Models\Video;
use App\Models\Comment;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function getStats(){
        $stats = [];

        $stats['users'] = User::count();
        $stats['views'] = View::count();
        $stats['comments'] = Comment::count();
        
        $stats['videos']['total'] = Video::count();
        $stats['videos']['new'] = Video::whereBetween('created_at', [
            Carbon::now()->subDays(7),
            Carbon::now()
        ])->count();

        return response($stats);
    }
}
