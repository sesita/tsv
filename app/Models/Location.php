<?php

namespace App\Models;

use Http;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use HasFactory, SoftDeletes;

    public static function location($ip)
    {
        $response = Http::get("http://ip-api.com/json/{$ip}")->json();
        if ($response['status'] == 'success') {
            $location = Location::where('title', 'like', $response['city'])->first();
            if(!$location) return null;
            return ['state' => $location->parent()->first()->title, 'city' => $location->title];
        }
        return null;
    }

    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }

    public function videos()
    {
        return $this->belongsToMany(Video::class, 'video_tag');
    }
}
