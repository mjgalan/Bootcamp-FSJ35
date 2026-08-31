<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Orden extends Model
{
   use SoftDeletes, HasFactory, HasApiTokens;
    //Campos que vamos a estar utilizando.
    protected $fillable = [
        'fecha',
        'estado',        
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class
        );

    }

    public function detorden(){
        return $this->hasMany(Detorden::class);

    }
}