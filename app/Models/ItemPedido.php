<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemPedido extends Model
{
    protected $table = 'itens_pedido';
    
    protected $fillable = [
        'pedido_id',
        'embalagem_id',
        'quantidade',
        'valor_unitario'
    ];

    public function embalagem(){
        return $this->belongsTo(Embalagem::class);
    }

    public function sabores(){
        return $this->belongsToMany(Sabor::class, 'itens_pedido_sabor', 'item_pedido_id', 'sabor_id');
    }

    public function pedido(){
        return $this->belongsTo(Pedido::class);
    }

    public function getPrecoTotalAttribute()
    {
        return round($this->valor_unitario * $this->quantidade, 2);
    }
}
