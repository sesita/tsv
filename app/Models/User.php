<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'full_name',
        'email',
        'avatar',
        'phone_number',
        'role_id',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'deleted_at',
        'updated_at',
        'created_at',
        'remember_token',
        'email_verified_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public $appends = ['likes', 'videos', 'views'];

    public function getAdditionalInfoAttribute($value)
    {
        return json_decode($value);
    }
    public function getAvatarAttribute($value)
    {
        if(filter_var($value, FILTER_VALIDATE_URL)) return $value;
        if($value) return asset('storage/'.$value);

        return "https://ui-avatars.com/api/?background=random&name={$this->name}&bold=true";
    }
    public function getLikesAttribute($value)
    {
        $videoIds = Video::where('user_id', $this->id)->pluck('id');
        return Interaction::whereIn('video_id', $videoIds)->sum('is_liked');
    }
    public function getVideosAttribute($value)
    {
        return Video::where('user_id', $this->id)->count();
    }
    public function getViewsAttribute($value)
    {
        return 54;
    }
}
