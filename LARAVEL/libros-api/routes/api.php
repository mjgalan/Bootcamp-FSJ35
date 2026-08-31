<?php

use App\Http\Controllers\LibrosController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);


//Route::get('/libros',[LibrosController::class, 'index']);

//Route::post('/libros',[LibrosController::class, 'store']);


Route::get('/libros',[LibrosController::class,'index'])->middleware('auth:sanctum');


Route::post('/libros',[LibrosController::class,'store'])->middleware('auth:sanctum');


Route::get('/libros/{id}',[LibrosController::class,'show'])->middleware('auth:sanctum');


Route::put('/libros/{id}',[LibrosController::class,'update'])->middleware('auth:sanctum');


Route::delete('/libros/{id}',[LibrosController::class,'destroy'])->middleware('auth:sanctum');

