<?php

namespace App\Policies;

use App\Models\Funcionario;
use App\Models\User;

class FuncionarioPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isCaixa();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Funcionario $funcionario): bool
    {
        return $user->isAdmin() || $user->isCaixa();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Funcionario $funcionario): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Funcionario $funcionario): bool
    {
        return $user->isAdmin();
    }

    public function reativar(User $user, Funcionario $funcionario): bool
    {
        return $user->isAdmin();
    }
}
