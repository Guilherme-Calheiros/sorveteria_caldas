<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemPedido extends Model
{
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
        $embalagem = $this->embalagem;

        if (!$embalagem) {
            return 0;
        }

        $quantidadeSabores = $this->sabores()->count();

        $saboresExtras = max(0, $quantidadeSabores - $embalagem->maximo_sabores);

        $valorExtra = $saboresExtras * $embalagem->preco_sabor_extra;

        $precoTotal = ($embalagem->valor_base + $valorExtra) * $this->quantidade;

        return round($precoTotal, 2);
    }
}
