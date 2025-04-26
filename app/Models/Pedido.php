<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $fillable = [
        'funcionario_id',
        'cliente_id',
        'total',
        'observacao',
        'data_pedido'
    ];

    public function itensPedido(){
        return $this->hasMany(ItemPedido::class);
    }

    public function funcionario(){
        return $this->belongsTo(User::class);
    }

    public function cliente(){
        return $this->belongsTo(Cliente::class);
    }

    public function getTotalPedidoAttribute()
    {
        $total = $this->itensPedido->sum(function ($itemPedido) {
            return $itemPedido->preco_total;
        });

        $this->total = $total;

        $this->save();

        return round($total, 2);
    }
}
