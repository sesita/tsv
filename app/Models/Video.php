<?php

namespace App\Models;

use App\Enums\Video\Status;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Storage;

class Video extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug', 'title', 'description', 'video', 'user_id', 'thumbnail', 'price', 'package', 'status', 'category_id', 'location_id'];

    public $appends = ['location', 'likes', 'category', 'dislikes', 'comments_count', 'shares', 'views'];

    public function scopePublished(Builder $query): void
    {
        $query->where('status', Status::PUBLISHED);
    }

    public function scopeSearch(Builder $query, $search): void
    {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")->orwhereHas('category', function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%");
            });
        });
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
            $query->search($search);
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
    public function generateImage($image, $slug)
    {
        $manager = new ImageManager(new Driver());

        $sizes = [
            'default' => [1280, 720],
            'tablet' => [640, 360],
            'mobile' => [320, 180],
        ];

        $folder = 'videos/' . $slug;
        $image->storeAs($folder, 'original.webp', 'public');

        $generatedImages = [];
        foreach ($sizes as $key => $dimensions) {
            $img = $manager->read($image);
            $img->cover($dimensions[0], $dimensions[1]);
            $path = "{$folder}/{$key}.webp";
            $img->toWebp()->save("storage/{$path}");
            $generatedImages[$key] = $path;
        }

        return $generatedImages;
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
    public function getStatusAttribute($value)
    {
        if ($value instanceof Status) return $value->name;
        return Status::from($value)->name;
    }

    public function getLocationAttribute($value)
    {
        $location = $this->location()->first();

        $res['children'] = $location->id;
        $res['parent'] = $location->parent()->first()->id ?? null;
        $res['title'] = $location->parent()->first()->title ?? $location->title;
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
        return json_decode($value);
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
