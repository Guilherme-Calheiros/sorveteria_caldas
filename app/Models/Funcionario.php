<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $fillable = [
        'name',
        'cpf',
        'telefone',
        'data_admissao',
        'cargo_id',
        'ativo'
    ];

    protected function casts(): array {
        return [
            'ativo' => 'boolean',
        ];
    }

    public function cargo(){
        return $this->belongsTo(Cargo::class);
    }

}
