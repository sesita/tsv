<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Video extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'title', 'description', 'video', 'user_id', 'thumbnail', 'views', 'category_id'];

    public $appends = ['iframe', 'tags', 'likes', 'dislikes', 'comments_count'];

    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'video_tag');
    }

    public function interactions()
    {
        return $this->hasMany(Interaction::class);
    }

public function getIframeAttribute()
{
    $value = $this->video;

    if ($value) {
        $value = str_replace(asset('storage/').'/', '', $value);
        $value = preg_replace_callback('/<iframe[^>]+src="([^"]+)"[^>]*>/', function ($matches) {
            $src = $matches[1];
            return '<iframe src="' . $src . '">';
        }, $value);

        return $value;
    }
}


    public function getTagsAttribute($value)
    {
        return $this->tags()->withCount('videos')->orderBy('videos_count', 'desc')->get();
    }

    public function getLikesAttribute($value)
    {
        return $this->interactions()->where('is_liked', true)->count();
    }

    public function getDislikesAttribute($value)
    {
        return $this->interactions()->where('is_liked', false)->count();
    }

    public function getCommentsCountAttribute($value)
    {
        return $this->comments()->count();
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
