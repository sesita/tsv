<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class View extends Model
{
    use HasFactory;

    protected $fillable = ['video_id', 'user_id', 'ip'];

    public function setView($video, $ip){
        
        $view = View::where('video_id', $video);
        if(Auth::user()){
            if($view->where('user_id', Auth::user()->id)->first()) return response(['message'=>'Already Viewed']);
        } else {
            if($view->where('ip', $ip)->first()) return response(['message'=>'Already Viewed']);
        }
        
        $viewQr = [
            'ip' => $ip,
            'video_id' => $video,
        ];

        if(Auth::user()) $viewQr['user_id'] = Auth::user()->id;

        View::create($viewQr);
    }
}
