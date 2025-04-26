<?php

namespace App\Providers;

use App\Models\Cargo;
use App\Models\User;
use App\Models\Sabor;
use App\Policies\CargoPolicy;
use App\Policies\UserPolicy;
use App\Policies\SaborPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{

    /**
     * The policy mappings for the application.
    */
   protected $policies = [
       User::class => UserPolicy::class,
       Cargo::class => CargoPolicy::class,
       Sabor::class => SaborPolicy::class,
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

        Gate::define('reativarUser', [UserPolicy::class, 'reativar']);

    }
}
