<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $fillable = [
        'name'
    ];

    public function usuarios()
    {
        return $this->hasMany(User::class);
    }
}
