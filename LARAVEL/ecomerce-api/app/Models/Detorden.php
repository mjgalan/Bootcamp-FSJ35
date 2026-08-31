<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Detorden extends Model
{
    use SoftDeletes, HasFactory, HasApiTokens;
    //Campos que vamos a estar utilizando.
    protected $fillable = [
        'orden_id',
        'producto_id',        
        'precio',
        'cantidad'
    ];

    public function orden(){
        return $this->belongsTo(Orden::class);

    }

     public function producto(){
        return $this->belongsTo(Producto::class);

    }
}
