<?php

use App\Http\Controllers\Api\DeclarationController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;





Route::group(['middleware' => ['auth:api']], function () {
    Route::get('projects/initiation', [ProjectController::class, 'initiation'])->name('project.initiation');
    Route::get('projects/projects', [ProjectController::class, 'projects'])->name('project.projects');
    Route::get('projects/approve', [ProjectController::class, 'approve'])->name('project.approve');
    Route::get('project/{projectId}/personnel', [ProjectController::class, 'personnel'])->name('project.personnel');
    Route::get('project/{id}', [ProjectController::class, 'find'])->name('project.find');
    Route::get('project/{id}/tasks', [ProjectController::class, 'tasks'])->name('project.tasks');
    Route::post('project', [ProjectController::class, 'create'])->name('project.create');
    Route::put('project/{id}', [ProjectController::class, 'update'])->name('project.update');
    Route::post('project/delete', [ProjectController::class, 'delete'])->name('project.delete');
    Route::post('project/lock/{id}', [ProjectController::class, 'lock'])->name('project.lock');
    Route::post('project/{projectId}/update-status', [ProjectController::class, 'updateStatus'])->name('project.change-status');
    Route::get('projects/quantity', [ProjectController::class, 'projectQuantity'])->name('project.quantity');
    Route::get('declaration/type', [DeclarationController::class, 'getByType'])->name('declaration.type');
    Route::apiResource('task',TaskController::class)->parameter('task','id');
    Route::apiResource('user', UserController::class)->parameter('user', 'id');
});
