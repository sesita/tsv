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
            'full_name' => 'required',
            'email' => 'required|email|unique:users,email,'.$userId,
            'avatar'=>'mimes:jpg,png,webp,gif|max:2048'
        ]);

        if (isset($request->avatar)) {
            $name = 'avatars/' . Str::random() . time() . '.webp';
            $request->avatar->move(public_path('storage/avatars'), $name);
            $avatar = $name;
        } else {
            $avatar = $request->avatar ?? null;
        }

        User::where('id', $userId)->update([
            'name' => $request->name,
            'email' => $request->email,
            'additional_info' => json_encode($request->additional_info),
            'avatar' => $avatar,
        ]);

        $user = User::where('id', $userId)->first();
        
        return response($user);
    }
}
