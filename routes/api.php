<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth
Route::group(['middleware' => 'api', 'prefix' => 'Auth'], function ($router) {
    Route::prefix('Social/{provider}')->group(function () {
        Route::get('Redirect', [SocialController::class, 'redirect']);
        Route::post('Callback', [SocialController::class, 'callback']);
    });
    Route::post('Login', [AuthController::class, 'login']);
    Route::post('Register', [AuthController::class, 'register']);
    Route::post('Logout', [AuthController::class, 'logout']);
    Route::post('Me', [AuthController::class, 'me']);
});