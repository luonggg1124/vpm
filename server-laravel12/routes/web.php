<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Server is running'
    ]);
});
Route::get('/login/response',function(){
    return response()->json(['message' => 'Bạn chưa đăng nhập'], 401);
})->name('login');