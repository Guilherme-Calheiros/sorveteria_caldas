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

    public function getTotalPedidoAttribute(){
        return round($this->itensPedido->sum(function ($itemPedido) {
            return $itemPedido->preco_total;
        }), 2);
    }

    public function atualizarTotal(){
        $this->total = $this->total_pedido;
        $this->save();
    }
}
