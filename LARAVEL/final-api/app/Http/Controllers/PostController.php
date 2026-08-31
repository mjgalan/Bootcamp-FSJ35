<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{

        
        //
       // $post = Post::all();
       $post = Post::with(['user'])->get();

        return response()->json(
            [
                'data'=>$post
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
                'title'=> 'required|string',
                'content'=>'required|string'

            ]);

            $post = Post::create([
                'title'=>$request->title,
                'content'=>$request->content,
                'user_id'=>$request->user()->id
            ]
            );

            return response()->json(
            [
                'message'=> 'Post creado correctamente',
                'data'=> $post
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
        $post = Post::findOrFail($id);

        return response()->json(
            [
              'data'=>$post  
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
        $post = Post::findOrFail($id);

        $request->validate([
                'title'=> 'required|string',
                'content'=>'required|string'

        ]);

        $post->update($request->all()); 
     

         return response()->json(
            [
                'message'=>'Post actualizado correctamente',
                'data'=>$post
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
             $post = Post::findOrFail($id);

             $post -> delete($id);

            return response()->json(
                [
                    'mensaje'=>'Post eliminado correctamente'
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

        
        $post = Post::onlyTrashed()->findOrFail($id);

        $post->restore();

        return response()->json([
            'message'=>"Post restored exitoso"
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
