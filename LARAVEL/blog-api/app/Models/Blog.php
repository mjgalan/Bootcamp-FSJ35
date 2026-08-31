<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    //Campos que vamos a estar utilizando.
    protected $fillable = [
        'title',
        'content'
    ];
}
