<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Dashboard\AdminController;
use App\Http\Controllers\Dashboard\DashboardController;

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
    Route::get('{slug}', [VideoController::class, 'getVideo']);
    Route::post('addComment', [VideoController::class, 'addComment']);
    Route::post('deleteComment', [VideoController::class, 'deleteComment']);
    Route::post('Interaction', [VideoController::class, 'interaction']);
    Route::post('View', [VideoController::class, 'setView']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'Dashboard'], function ($router) {
    Route::post('Settings', [DashboardController::class, 'Settings']);
    Route::post('Upload', [DashboardController::class, 'UploadVideo']);
    Route::post('Update', [DashboardController::class, 'UpdateVideo']);
    Route::get('Checkout', [DashboardController::class, 'Checkout']);
    Route::get('MyVideos', [DashboardController::class, 'MyVideos']);
    Route::get('MyVideo/{id}', [DashboardController::class, 'MyVideo']);
    Route::get('VideoViews/{id}', [DashboardController::class, 'VideoViews']);

    Route::any('Admin/{method}', function ($method, Request $request) {
        $controller = new AdminController();
        return $controller->callAction($method, [$request]);
    })->middleware('admin');
});