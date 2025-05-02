<?php

namespace App\Providers;

use App\Models\Cargo;
use App\Models\Sabor;
use App\Policies\CargoPolicy;
use App\Policies\SaborPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    /**
     * The policy mappings for the application.
    */
   protected $policies = [
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
    }
}
