<?php

use App\Livewire\Auth\Login;
use App\Http\Controllers\Controller;
use App\Livewire\Auth\ResetPassword;
use App\Livewire\Dashboard\Settings;
use App\Livewire\Dashboard\Dashboard;
use Illuminate\Support\Facades\Route;
use App\Livewire\Dashboard\Sales\SaleFormController;
use App\Livewire\Dashboard\Sales\SaleListController;
use App\Livewire\Dashboard\Sliders\SliderFormController;
use App\Livewire\Dashboard\Sliders\SliderListController;
use App\Livewire\Dashboard\Supplies\SupplyFormController;
use App\Livewire\Dashboard\Supplies\SupplyListController;
use App\Livewire\Dashboard\Products\ProductFormController;
use App\Livewire\Dashboard\Products\ProductListController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::any('{catchall}', [Controller::class, 'firstLoader'])->where("catchall", ".*");