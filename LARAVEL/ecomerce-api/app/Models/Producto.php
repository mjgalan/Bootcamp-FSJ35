<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{

    use SoftDeletes, HasFactory;

    protected $fillable = [
        'nombre',
        'precio',        
        'cantidad'
    ];
}
