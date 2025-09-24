<?php

namespace App\Providers;

use App\Models\Embalagem;
use App\Models\Funcionario;
use App\Models\Pedido;
use App\Models\Sabor;
use App\Policies\EmbalagemPolicy;
use App\Policies\FuncionarioPolicy;
use App\Policies\PedidoPolicy;
use App\Policies\SaborPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    /**
     * The policy mappings for the application.
    */
   protected $policies = [
        Pedido::class => PedidoPolicy::class,
        Embalagem::class => EmbalagemPolicy::class,
        Sabor::class => SaborPolicy::class,
        Funcionario::class => FuncionarioPolicy::class,
   ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}