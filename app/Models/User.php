<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'perfil',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function pedidos(){
        return $this->hasMany(Pedido::class);
    }

    public function temPermissao(string $nivelMinimo){
        
        if (!$this->perfil) {
            return false;
        }

        $hierarquia = [
            'caixa' => 1,
            'administrador' => 2,
        ];

        $nivelCargo = $hierarquia[$this->perfil] ?? 0;
        $nivelRequerido = $hierarquia[$nivelMinimo] ?? 0;

        return $nivelCargo >= $nivelRequerido;
    }

    public function setEmailAttribute($value){
        $this->attributes['email'] = strtolower($value);
    }
}
