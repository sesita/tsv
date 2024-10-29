<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Main\MainController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Dashboard\VideoController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Main\VideoInteractionController;

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


Route::prefix('Main')->group(function () {
    Route::get('primary', [MainController::class, 'primary']);
    Route::get('getUser', [MainController::class, 'getUser']);
    Route::get('getTags', [MainController::class, 'getTags']);
    Route::get('getVideos', [MainController::class, 'getVideos']);
    Route::get('getCategories', [MainController::class, 'getCategories']);
    Route::get('getLocations/{parent?}', [MainController::class, 'getLocations']);
    Route::post('addReview', [MainController::class, 'addReview']);
});

Route::prefix('Video')->group(function () {
    Route::get('{slug}', [MainController::class, 'getVideo']);
    Route::post('addComment', [VideoInteractionController::class, 'addComment']);
    Route::post('deleteComment', [VideoInteractionController::class, 'deleteComment']);
    Route::post('Interaction', [VideoInteractionController::class, 'interaction']);
    Route::post('View', [VideoInteractionController::class, 'setView']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'Dashboard'], function ($router) {
    Route::apiResource('Videos', VideoController::class);
    Route::post('Settings', [ProfileController::class, 'Settings']);

    Route::prefix('Admin')->group(function () {
        Route::apiResource('Users', UserController::class);
        Route::apiResource('Categories', CategoryController::class);
        Route::get('getStats', [AdminController::class, 'getStats']);
        Route::get('Settings', [SettingController::class, 'index']);
        Route::post('Settings', [SettingController::class, 'updateSetting']);
        Route::post('Settings/Upload-media', [SettingController::class, 'uploadMedia']);
    });
});