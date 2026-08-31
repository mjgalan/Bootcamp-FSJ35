<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);


Route::get('/posts',[PostController::class,'index']);


Route::middleware('auth:sanctum')->group( function(){
    Route::post('/post',[PostController::class,'store']);

    //post/2
    Route::get('/post/{id}',[PostController::class,'show']);


//post/2
    Route::put('/post/{id}',[PostController::class,'update']);

//post/2
    Route::delete('/post/{id}',[PostController::class,'destroy']);


     Route::put('/postr/{id}',[PostController::class,'restore']);

}

);
//Route::post('/post',[PostController::class,'store'])->middleware('auth:sanctum');



