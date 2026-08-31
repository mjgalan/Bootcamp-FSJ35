<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $blog = Blog::all();

        return response()->json(
            [
                'data'=>$blog
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       
        $blog = Blog::create($request->all());

        return response()->json(
        [
            'message'=> 'Blog creado correctamente',
            'data'=> $blog
        ]

        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        //Buscamos un recurso en especifico por un ID.
        $blog = Blog::findOrFail($id);

        return response()->json(
            [
              'data'=>$blog  
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
        $blog = Blog::findOrFail($id);

        $blog->update($request->all()); 
     

         return response()->json(
            [
                'id'=>$id,
                'data-request'=>$request->all(),
                'data-response'=>$blog
            ]

        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $blog = Blog::findOrFail($id);

        $blog -> delete($id);

        return response()->json(
            [
                'mensaje'=>'Producto eliminado correctamente'
            ]

        );
    }
}
