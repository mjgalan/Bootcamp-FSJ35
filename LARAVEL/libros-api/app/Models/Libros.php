<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Libros extends Model
{
    //Campos que vamos a estar utilizando.
    protected $fillable = [
        'title',
        'description',
        'author'
    ];
}
