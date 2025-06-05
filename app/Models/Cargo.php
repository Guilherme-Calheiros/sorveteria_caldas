<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $fillable = [
        'name',
        'permissao'
    ];

    public function usuarios()
    {
        return $this->hasMany(User::class);
    }
}
