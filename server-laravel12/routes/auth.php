<?php

use App\Http\Controllers\Api\AuthController;

use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::group(['middleware' => ['auth:api']], function () {
    Route::delete('logout', [AuthController::class, 'logout'])->name('logout');
});
Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
