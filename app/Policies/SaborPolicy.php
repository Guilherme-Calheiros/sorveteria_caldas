<?php

namespace App\Policies;

use App\Models\User;

class SaborPolicy
{
    public function viewAny(User $user)
    {

        return $user->ativo;
    }
    
    /**
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {

        return $user->ativo;
    }
    
    /**
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {

        return $user->temPermissao('acesso_completo')() && $user->ativo;
    }

    /**
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user)
    {

        return $user->temPermissao('acesso_completo')() && $user->ativo;
    }

    /**
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user)
    {
        // Apenas o admin pode excluir outro usuário
        return $user->temPermissao('acesso_completo')() && $user->ativo;
    }
}
