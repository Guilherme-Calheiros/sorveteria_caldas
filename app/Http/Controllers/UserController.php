<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index()
    {
        $usuarios = User::orderBy('id', 'asc')->get();
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Usuarios/Show', [
            'usuario' => $user
        ]);
    }

}
