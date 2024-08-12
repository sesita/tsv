<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'title', 'description', 'video', 'user_id', 'thumbnail', 'category_id', 'location_id'];

    public $appends = ['likes', 'dislikes', 'comments_count', 'shares', 'views'];

    public function views()
    {
        return $this->hasMany(View::class);
    }

    public function getViewsAttribute()
    {
        return $this->views()->count();
    }

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

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function interactions()
    {
        return $this->hasMany(Interaction::class);
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
}
