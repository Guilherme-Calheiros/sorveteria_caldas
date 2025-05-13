<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sabor extends Model
{
    protected $table = 'sabores';

    protected $fillable = [
        'name'
    ];

    public function itemPedidos(){
        return $this->belongsToMany(ItemPedido::class, 'itens_pedido_sabor', 'sabor_id', 'item_pedido_id');
    }
}
