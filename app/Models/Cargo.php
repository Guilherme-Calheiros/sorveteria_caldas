<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $fillable = [
        'name',
    ];

    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class);
    }
}
