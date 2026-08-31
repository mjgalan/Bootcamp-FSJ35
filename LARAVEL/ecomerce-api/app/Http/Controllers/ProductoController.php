<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

        
        //
        $producto = Producto::all();

        return response()->json(
            [
                'data'=>$producto
            ]
        );
        }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try{

            $request->validate([
                'nombre'=> 'required|string',
                'precio'=>'required|numeric|decimal:0,2|min:0',
                'cantidad'=>'required|integer|min:1'

            ]);

            $producto = Producto::create([
                'nombre'=>$request->nombre,
                'precio'=>$request->precio,
                'cantidad'=>$request->cantidad
            ]
            );

            return response()->json(
            [
                'message'=> 'Producto creado correctamente',
                'data'=> $producto
            ],201

            );


        }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
       Try{
             //Buscamos un recurso en especifico por un ID.
        $producto = Producto::findOrFail($id);

        return response()->json(
            [
              'data'=>$producto  
            ]

        );
       
        }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        //

        try{
             //Buscamos un recurso en especifico por un ID.
        $producto = Producto::findOrFail($id);

        $request->validate([
                'nombre'=> 'required|string',
                'precio'=>'required|numeric|decimal:0,2|min:0',
                'cantidad'=>'required|integer|min:1'

        ]);

        $producto->update($request->all()); 
     

         return response()->json(
            [
                'message'=>'Producto actualizado correctamente',
                'data'=>$producto
            ]
        );    
        
        }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        //
        try{
             $producto = Producto::findOrFail($id);

             $producto -> delete($id);

            return response()->json(
                [
                    'mensaje'=>'Producto eliminado correctamente'
                ]

            );


         }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }
    }

     public function restore(Request $request, string $id){
        try{

        
        $producto = Producto::onlyTrashed()->findOrFail($id);

        $producto->restore();

        return response()->json([
            'message'=>"Producto restaurado con éxito"
        ]);
        }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }

    }
}
