<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
    use HasFactory, SoftDeletes;

    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }

    public function videos()
    {
        return $this->belongsToMany(Video::class, 'video_tag');
    }
}
