<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = ['title'];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];

    public function videos()
    {
        return $this->belongsToMany(Video::class, 'video_tag');
    }
}
