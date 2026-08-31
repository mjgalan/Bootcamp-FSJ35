<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detordens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('orden_id')->constrained('ordens','id')->cascadeOnDelete()->cascadeOnUpdate();//Relacionandolo con la tabla orden.
            $table->foreignId('producto_id')->constrained('productos','id')->cascadeOnDelete()->cascadeOnUpdate();//Relacionandolo con la tabla productos.
            $table->decimal('precio',10,2);
            $table->unsignedInteger('cantidad');
            $table->softDeletes(); //Agrega una fecha de cuando se quiso eliminar.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detordens');
    }
};
