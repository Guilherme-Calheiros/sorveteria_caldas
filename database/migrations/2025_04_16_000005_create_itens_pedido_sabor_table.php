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
        Schema::create('itens_pedido_sabor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sabor_id')->constrained('sabores'); // FK para sabores
            $table->foreignId('item_pedido_id')->constrained('itens_pedido'); // FK para itens do pedido
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itens_pedido_sabor');
    }
};
