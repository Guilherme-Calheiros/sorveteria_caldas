<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $fillable = [
        'user_id',
        'funcionario_id',
        'cliente_nome',
        'observacao',
        'total',
        'data_pedido'
    ];

    public function itensPedido(){
        return $this->hasMany(ItemPedido::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function funcionario(){
        return $this->belongsTo(Funcionario::class);
    }

    public function getTotalPedidoAttribute(){
        return round($this->itensPedido->sum(function ($itemPedido) {
            return $itemPedido->preco_total;
        }), 2);
    }

    public function atualizarTotal(){
        $this->update(['total' => $this->total_pedido]);
    }
}
