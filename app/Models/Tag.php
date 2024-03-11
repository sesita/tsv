<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];

    public function videos()
    {
        return $this->belongsToMany(Video::class, 'video_tag');
    }
}
