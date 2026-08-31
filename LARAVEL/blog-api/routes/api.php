<?php

use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//localhost:8000/api
Route::get('/blog',[BlogController::class, 'index']);

Route::post('/blog',[BlogController::class, 'store']);

//product/2
Route::get('/blog/{id}',[BlogController::class,'show']);


//product/2
Route::put('/blog/{id}',[BlogController::class,'update']);

//product/2
Route::delete('/blog/{id}',[BlogController::class,'destroy']);