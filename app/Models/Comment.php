<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $hidden = ['deleted_at', 'updated_at'];

    public $appends = ['replies', 'user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
    public function getUserAttribute()
    {
        return $this->user()->first(['id','name','avatar']);
    }
    public function getRepliesAttribute()
    {
        return $this->replies()->get();
    }
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }

}
