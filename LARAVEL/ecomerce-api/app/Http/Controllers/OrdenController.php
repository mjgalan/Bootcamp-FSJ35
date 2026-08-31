<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrdenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

  
       $orden = Orden::with(['user'])->get();

        return response()->json(
            [
                'data'=>$orden
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
                'fecha'=> 'required|date|before_or_equal:today',
                'estado'=>'required|string|in:pendiente,pagado,enviado,cancelado'

            ]);

            $orden = Orden::create([
                'fecha'=>$request->fecha,
                'estado'=>$request->estado,
                'user_id'=>$request->user()->id
            ]
            );

            return response()->json(
            [
                'message'=> 'Orden creada correctamente',
                'data'=> $orden
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
        $orden = Orden::findOrFail($id);

        return response()->json(
            [
              'data'=>$orden  
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
        $orden = Orden::findOrFail($id);

        $request->validate([
                'fecha'=> 'required|date|before_or_equal:today',
                'estado'=>'required|string|in:pendiente,pagado,enviado,cancelado'

        ]);

        $orden->update($request->all()); 
     

         return response()->json(
            [
                'message'=>'Orden actualizada correctamente',
                'data'=>$orden
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
             $orden = Orden::findOrFail($id);

             $orden -> delete($id);

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

        
        $orden = Orden::onlyTrashed()->findOrFail($id);

        $orden->restore();

        return response()->json([
            'message'=>"Orden restaurada con éxito"
        ]);
        }catch(\Exception $error){
             return response()->json(
            [
                'message'=>$error->getMessage()
            ]
        );

        }

    }

     public function ordenByUser()
    {
        try{

  
        $ordenes = $ordenes = Orden::where('user_id', Auth::id())->get();;

        return response()->json(
            [
                'data'=>$ordenes
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

    
}
