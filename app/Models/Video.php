<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'title', 'description', 'video', 'user_id', 'thumbnail', 'category_id', 'location_id'];

    public $appends = ['tags', 'likes', 'dislikes', 'comments_count', 'shares', 'views'];

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

    public function syncTags($tags)
    {
        $video = Video::findOrFail($this->id);

        $tagIds = collect($tags)->map(function ($tagTitle) {
            return Tag::firstOrCreate(['title' => ucfirst($tagTitle)])->id;
        });

        $video->tags()->sync($tagIds);

        return response()->json(['message' => 'Tags synchronized successfully.']);
    }

    public function locations()
    {
        return $this->belongsToMany(Tag::class, 'video_tag');
    }

    public function interactions()
    {
        return $this->hasMany(Interaction::class);
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
        if ($value) {
            return asset('storage/' . $value);
        }

    }

    public function getSharesAttribute($value)
    {
        return 0;
    }

    public function getVideoAttribute($value)
    {
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }
        return asset('storage/' . $value);
    }

    public function getViewsAttribute($value)
    {
        return View::where('video_id', $this->id)->count();
    }
}
