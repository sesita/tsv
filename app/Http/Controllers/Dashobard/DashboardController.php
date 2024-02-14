<?php

namespace App\Http\Controllers\Dashobard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class DashboardController extends Controller
{
    public function Settings(Request $request)
    {
        $userId = Auth::user()->id;
        $request->validate([
            'name' => 'required',
            'full_name' => 'required',
            'email' => 'required|email|unique:users,email,' . $userId,
        ]);

        if ($request->hasFile('avatar')) {
            $request->validate([
                'avatar' => 'mimes:jpg,png,webp,gif|max:2048',
            ]);
            $name = 'avatars/' . Str::random() . time() . '.webp';
            $request->avatar->move(public_path('storage/avatars'), $name);
            $avatar = $name;
        } else {
            $avatar = $request->avatar ?? null;
        }

        User::where('id', $userId)->update([
            'name' => $request->name,
            'email' => $request->email,
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
            'additional_info' => json_encode($request->additional_info),
            'avatar' => $avatar,
        ]);

        $user = User::where('id', $userId)->first();

        return response($user);
    }
}
