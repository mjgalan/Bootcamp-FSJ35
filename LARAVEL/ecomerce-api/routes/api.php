<?php

use App\Http\Controllers\DetordenController;
use App\Http\Controllers\OrdenController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);

//Obtener todos los productos, aqui no se aplica seguridad de token, porque se permite verlos todos.
Route::get('/productos',[ProductoController::class,'index']);

Route::middleware('auth:sanctum')->group( function(){

    //Guarda la información del producto.
    Route::post('/producto',[ProductoController::class,'store']);

    //Muestra detalle de información del producto.
    Route::get('/producto/{id}',[ProductoController::class,'show']);


    //Actualización del producto, indicado vía su ID.
    Route::put('/producto/{id}',[ProductoController::class,'update']);

    //Borrado logico del producto indicado vía su ID
    Route::delete('/producto/{id}',[ProductoController::class,'destroy']);

    //Restaurar el producto indicando vía su ID
    Route::put('/producto/{id}/restore',[ProductoController::class,'restore']);

}
);


Route::middleware('auth:sanctum')->group( function(){
    //Consulta de las ordenes indicadas por el cliente.
    Route::get('/ordenes',[OrdenController::class,'index']);

    //Guarda la información de la orden.
    Route::post('/orden',[OrdenController::class,'store']);

    //Muestra detalle de información de la orden.
    Route::get('/orden/{id}',[OrdenController::class,'show']);

    //Actualización  de la orden., indicado vía su ID.
    Route::put('/orden/{id}',[OrdenController::class,'update']);

    //Borrado logico de la orden. indicado vía su ID
    Route::delete('/orden/{id}',[OrdenController::class,'destroy']);

    //Restaurar de la orden. indicando vía su ID
    Route::put('/orden/{id}/restore',[OrdenController::class,'restore']);

     //Consulta de las ordenes indicadas por el cliente por usuario logueado.
    Route::get('/ordenxuser',[OrdenController::class,'ordenByUser']);
   

}
);


Route::middleware('auth:sanctum')->group( function(){
    //Consulta del detalle de ordenes.
    Route::get('/detordenes',[DetordenController::class,'index']);

    //Guarda la información del detalleorden.
    Route::post('/detorden',[DetordenController::class,'store']);

    //Muestra detalle de información del detalleorden.
    Route::get('/detorden/{id}',[DetordenController::class,'show']);

    //Actualización del detalleorden, indicado vía su ID.
    Route::put('/detorden/{id}',[DetordenController::class,'update']);

    //Borrado logico del detalleorden indicado vía su ID
    Route::delete('/detorden/{id}',[DetordenController::class,'destroy']);

    //Restaurar el detalleorden indicando vía su ID
    Route::put('/detorden/{id}/restore',[DetordenController::class,'restore']);


}
);