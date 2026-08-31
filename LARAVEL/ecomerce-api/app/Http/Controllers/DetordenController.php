<?php

namespace App\Http\Controllers;

use App\Models\Detorden;
use Illuminate\Http\Request;

class DetordenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

  
       $detorden = Detorden::with(['orden'])->get();

        return response()->json(
            [
                'data'=>$detorden
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
                'order_id'=>'required|integer',
                'product_id'=>'required|integer',
                'precio'=>'required|numeric|decimal:0,2|min:0',
                'cantidad'=>'required|integer|min:1'

            ]);

            $detorden = Detorden::create([
                'order_id'=>$request->order_id,
                'producto_id'=>$request->producto_id,
                'precio'=>$request->precio,
                'cantidad'=>$request->cantidad,
                
            ]
            );

            return response()->json(
            [
                'message'=> 'Detalle de orden creado correctamente',
                'data'=> $detorden
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
    public function show(string $id)
    {
       Try{
             //Buscamos un recurso en especifico por un ID.
        $detorden = Detorden::findOrFail($id);

        return response()->json(
            [
              'data'=>$detorden  
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
        $detorden = Detorden::findOrFail($id);

        $request->validate([
                'order_id'=>'required|integer',
                'product_id'=>'required|integer',
                'precio'=>'required|numeric|decimal:0,2|min:0',
                'cantidad'=>'required|integer|min:1'

        ]);

        $detorden->update($request->all()); 
     

         return response()->json(
            [
                'message'=>'Detalle Orden actualizada correctamente',
                'data'=>$detorden
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
             $detorden = Detorden::findOrFail($id);

             $detorden -> delete($id);

            return response()->json(
                [
                    'mensaje'=>'Orden eliminado correctamente'
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

        
        $detorden = Detorden::onlyTrashed()->findOrFail($id);

        $detorden->restore();

        return response()->json([
            'message'=>"DetOrden restaurada con éxito"
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
