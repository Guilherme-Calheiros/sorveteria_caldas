<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
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
        'telefone',
        'cargo_id',
        'data_admissao',
        'password',
        'ativo',
        'trocar_senha',
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
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'ativo' => 'boolean',
            'trocar_senha' => 'boolean',
        ];
    }

    public function cargo(){
        return $this->belongsTo(Cargo::class);
    }

    public function pedidos(){
        return $this->hasMany(Pedido::class);
    }

    public function temPermissao(string $nivelMinimo){
        
        if (!$this->cargo) {
            return false;
        }

        $hierarquia = [
            'acesso_cliente' => 1,
            'acesso_limitado' => 2,
            'acesso_total' => 3,
        ];

        $nivelCargo = $hierarquia[$this->cargo->permissao] ?? 0;
        $nivelRequerido = $hierarquia[$nivelMinimo] ?? 0;

        return $nivelCargo >= $nivelRequerido;
    }

    public function setEmailAttribute($value){
        $this->attributes['email'] = strtolower($value);
    }
}
