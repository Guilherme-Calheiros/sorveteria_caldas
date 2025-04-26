<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        // Apenas administradores podem ver todos os usuários
        return $user->isAdmin() && $user->ativo;
    }
    
    /**
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, User $model)
    {
        // Qualquer usuário pode ver seu próprio perfil, mas um admin pode ver qualquer um
        return $user->id === $model->id || $user->isAdmin() && $user->ativo;
    }
    
    /**
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        // Apenas administradores podem criar novos usuários
        return $user->isAdmin() && $user->ativo;
    }

    /**
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, User $model)
    {
        // O admin pode atualizar qualquer usuário, e o próprio usuário pode atualizar seu perfil
        return $user->id === $model->id || $user->isAdmin() && $user->ativo;
    }

    /**
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, User $model)
    {
        // Apenas o admin pode excluir outro usuário
        return $user->isAdmin() && $user->id !== $model->id && $user->ativo;
    }

    public function reativar(User $user){
        
        return $user->isAdmin() && $user->ativo;
    }

}
