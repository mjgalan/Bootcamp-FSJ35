<?php

namespace App\Http\Controllers;

use App\Models\Libros;
use Illuminate\Http\Request;

class LibrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try{

        $libro = Libros::all();

        return response()->json(
            [
                'data'=>$libro
            ]
        );
        } catch(\Exception $error){
            return response()->json(
                [
                    'message' => $error->getMessage()
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

        
        $libro = Libros::create($request->all());

        return response()->json(
        [
            'message'=> 'Libro creado correctamente',
            'data'=> $libro
        ]

        );
        } catch(\Exception $error){
            return response()->json(
                [
                    'message' => $error->getMessage()
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        //Buscamos un recurso en especifico por un ID.
        $libro = Libros::findOrFail($id);

        return response()->json(
            [
              'data'=>$libro  
            ]

        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        //
        //Buscamos un recurso en especifico por un ID.
        $libro = Libros::findOrFail($id);

        $libro->update($request->all()); 
     

         return response()->json(
            [
                'id'=>$id,
                'data-request'=>$request->all(),
                'data-response'=>$libro
            ]

        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $libro = Libros::findOrFail($id);

        $libro -> delete($id);

        return response()->json(
            [
                'mensaje'=>'Libro eliminado correctamente'
            ]

        );
    }
}
