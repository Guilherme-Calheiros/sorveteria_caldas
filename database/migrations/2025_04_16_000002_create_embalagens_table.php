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
        Schema::create('embalagens', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('maximo_sabores');
            $table->decimal('preco_sabor_extra', 8, 2);
            $table->decimal('valor_base', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('embalagens');
    }
};
