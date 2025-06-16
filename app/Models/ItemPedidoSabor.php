<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemPedidoSabor extends Model
{
    protected $table = 'itens_pedido_sabor';

    protected $fillable = [
        'sabor_id',
        'item_pedido_id'
    ];

    public function sabor(){
        return $this->belongsTo(Sabor::class, 'sabor_id');
    }

    public function itemPedido(){
        return $this->belongsTo(ItemPedido::class, 'item_pedido_id');
    }
}
