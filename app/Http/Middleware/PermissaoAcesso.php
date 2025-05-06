<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PermissaoAcesso
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user) {
            abort(401, 'Não autenticado.');
        }

        if ($user->temPermissao('acesso_completo') && $user->ativo) {
            return $next($request);
        }

        abort(403, 'Você não tem permissão para acessar esta área.');
    }
}
