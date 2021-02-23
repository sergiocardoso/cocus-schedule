<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Public routes
 * No authorization
 */
Route::post('login', [AuthController::class, 'login']);
Route::post('signin', [AuthController::class, 'signin']);


/**
 * User Routes
 */
Route::prefix('user')
    ->middleware('auth:sanctum')
    ->group(function() {
        Route::get('get', [UserController::class, 'get']);
        Route::put('edit', [UserController::class, 'edit']);
        Route::delete('delete', [UserController::class, 'hide']);
        Route::get('logout', [AuthController::class, 'logout']);
    });


/**
 * Schedule Routes
 */
Route::prefix('schedule')
    ->middleware('auth:sanctum')
    ->group(function() {
        Route::get('list', [ScheduleController::class, 'list']);
        Route::post('new', [ScheduleController::class, 'new']);
        Route::put('edit/{id}', [ScheduleController::class, 'edit']);
        Route::delete('delete/{id}', [ScheduleController::class, 'delete']);
    });
