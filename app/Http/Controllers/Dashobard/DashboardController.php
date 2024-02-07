<?php

namespace App\Http\Controllers\Dashobard;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function Settings(Request $request)
    {
        $userId = Auth::user()->id;
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$userId,
            'avatar'=>'mimes:jpg,png,webp,gif|max:2048'
        ]);

        if (isset($request->avatarRaw)) {
            $name = 'avatars/' . Str::random() . time() . '.webp';
            $request->avatarRaw->move(public_path('storage/avatars'), $name);
            $avatar = $name;
        } else {
            $avatar = $request->avatar ?? null;
        }

        User::where('id', $userId)->update([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => $avatar
        ]);

        $user = User::where('id', $userId)->first();
        
        return response($user);
    }
}
