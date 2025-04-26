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
        Gate::define('viewUsers', [UserPolicy::class, 'viewAny']);
        Gate::define('viewUser', [UserPolicy::class, 'view']);
        Gate::define('createUser', [UserPolicy::class, 'create']);
        Gate::define('updateUser', [UserPolicy::class, 'update']);
        Gate::define('deleteUser', [UserPolicy::class, 'delete']);
        Gate::define('reativarUser', [UserPolicy::class, 'reativar']);

        Gate::define('viewCargos', [CargoPolicy::class, 'viewAny']);

        Gate::define('viewSabores', [SaborPolicy::class, 'viewAny']);
        Gate::define('viewSabor', [SaborPolicy::class, 'view']);
        Gate::define('createSabor', [SaborPolicy::class, 'create']);
        Gate::define('updateSabor', [SaborPolicy::class, 'update']);
        Gate::define('deleteSabor', [SaborPolicy::class, 'delete']);
    }
}
