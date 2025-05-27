<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Embalagem extends Model
{
    protected $table = 'embalagens';

    protected $fillable = [
        'name',
        'maximo_sabores',
        'preco_sabor_extra',
        'valor_base'
    ];

    protected $casts = [
        'preco_sabor_extra' => 'decimal:2',
        'valor_base' => 'decimal:2',
    ];

    public function itensPedido(){
        return $this->hasMany(ItemPedido::class);
    }
}
