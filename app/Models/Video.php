<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Video extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'title', 'description', 'video', 'user_id', 'thumbnail', 'views', 'category_id'];

    public $appends = ['likes', 'dislikes', 'comments_count'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getLikesAttribute($value)
    {
        return 5;
    }

    public function getDislikesAttribute($value)
    {
        return 30;
    }

    public function getViewsAttribute($value)
    {
        return 24532;
    }

    public function getCommentsCountAttribute($value)
    {
        return 1500;
    }

    public function getThumbnailAttribute($value)
    {
        if($value) return asset('storage/'.$value);
    }

    public function getVideoAttribute($value)
    {
        if($value) return asset('storage/'.$value);
    }
}
