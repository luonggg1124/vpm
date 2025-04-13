<?php

use App\Http\Controllers\Api\DeclarationController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;





Route::group(['middleware' => ['auth:api']], function () {
    Route::get('projects/initiation',[ProjectController::class,'initiation'])->name('project.initiation');
    Route::get('projects/projects',[ProjectController::class,'projects'])->name('project.projects');
    Route::get('project/{projectId}/personnel',[ProjectController::class,'personnel'])->name('project.personnel');
    Route::get('project/{id}',[ProjectController::class,'find'])->name('project.find');
    Route::post('project',[ProjectController::class,'create'])->name('project.create');
    Route::post('project/delete',[ProjectController::class,'delete'])->name('project.delete');
    Route::post('project/lock/{id}',[ProjectController::class,'lock'])->name('project.lock');
    Route::post('project/{projectId}/update-status',[ProjectController::class,'updateStatus'])->name('project.change-status');
    Route::get('projects/quantity',[ProjectController::class,'projectQuantity'])->name('project.quantity');
    Route::get('declaration/type', [DeclarationController::class, 'getByType'])->name('declaration.type');

    Route::apiResource('user',UserController::class)->parameter('user','id');
});