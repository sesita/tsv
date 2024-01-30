<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function callback($provider)
    {
        try {
            $user = Socialite::driver($provider)->stateless()->user();
            if (!isset($user))
                return response(['status' => 'error', 'message' => 'user not found']);

            $currentUser = User::where('email', $user->email)->first();

            if ($currentUser) {
                if($currentUser->email_verified_at == null){
                    $user = new User;
                    $user->sendEmailVerificationCode($currentUser->id, $currentUser->email);
                    return response(['status' => 'verify_email', 'message' => 'საჭიროა ელ.ფოსტის ვერიფიკაცია'], 403);
                }
                $token = Auth::login($currentUser);
                return $this->respondWithToken($token);
            } else {

                if ($provider == 'Google') {
                    $emailVerified = $user->user['email_verified'] ? date('Y-m-d H:i:s') : null;
                } elseif ($provider == 'discord') {
                    $emailVerified = $user->user['verified'] ? date('Y-m-d H:i:s') : null;
                } else {
                    $emailVerified = null;
                }

                $user = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'password' => Hash::make($user->id),
                    'email_verified_at' => $emailVerified
                ]);

                if ($emailVerified) {
                    $token = Auth::login($user);
                    return $this->respondWithToken($token);
                } else {
                    $user = new User;
                    $user->sendEmailVerificationCode($user->id, $user->email);
                    return response(['status' => 'verify_email', 'message' => 'საჭიროა ელ.ფოსტის ვერიფიკაცია'], 403);
                }
            }

        } catch (Exception $e) {
            return response(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}