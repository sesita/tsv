<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'title', 'description', 'video', 'user_id', 'thumbnail', 'price', 'status', 'category_id', 'location_id'];

    public $appends = ['location', 'likes', 'category', 'dislikes', 'comments_count', 'shares', 'views'];

    public function scopePublished(Builder $query): void
    {
        $query->where('status', 'active');
    }

    public function getVideos($params = [])
    {
        $paginate = $params['paginate'] ?? 8;
        $orderBy = $params['orderBy'] ?? 'id';
        $search = $params['search'] ?? null;
        $related = $params['related'] ?? null;

        $query = Video::published()->withCount('views');

        if ($orderBy == 'popular') {
            $query->orderBy('views_count', 'desc');
        } else {
            $query->orderBy('id', 'desc');
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")->orwhereHas('category', function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%");
                });
            });
        }

        if ($related) {
            $relatedVideo = Video::find($related);

            if ($relatedVideo) {
                $query->where('category_id', $relatedVideo->category_id)
                    ->where('id', '!=', $related);
            }
        }
        $list = $query->with(['category', 'user'])->paginate($paginate);

        return $list;
    }

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

    public function getLocationAttribute($value)
    {
        $location = $this->location()->first();

        $res['children'] = $location->id;
        $res['parent'] = $location->parent()->first()->id ?? null;
        return $res;
    }

    public function getLikesAttribute($value)
    {
        return $this->interactions()->where('is_liked', true)->count();
    }

    public function getDislikesAttribute($value)
    {
        return $this->interactions()->where('is_liked', false)->count();
    }
    public function getCategoryAttribute($value)
    {
        return $this->category()->first();
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
