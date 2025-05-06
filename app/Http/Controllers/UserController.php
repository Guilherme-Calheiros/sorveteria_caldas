<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Cargo;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::all();
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cargos = Cargo::all();

        return Inertia::render('Usuarios/Create', [
            'cargos' => $cargos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'email' => 'required|string|max:255',
            'telefone' => 'required|string|max:255',
            'cargo_id' => 'required|exists:cargos,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'telefone' => $validated['telefone'],
            'cargo_id' => $validated['cargo_id'],
            'data_admissao' => now()->toDateString(),
            'password' => Hash::make(env('DEFAULT_USER_PASSWORD')),
            'trocar_senha' => true,
        ]);

        return redirect()->route('usuarios.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);

        $cargos = Cargo::all();

        return Inertia::render('Usuarios/Edit', [
            'usuario' => $user,
            'cargos' => $cargos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'telefone' => 'required|string|max:255',
            'cargo_id' => 'required|exists:cargos,id',
        ]);
    
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'telefone' => $validated['telefone'],
            'cargo_id' => $validated['cargo_id'],
        ]);
    
        return redirect()->route('usuarios.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        $user->ativo = false;
        $user->save();

        return redirect()->route('usuarios.index');
    }

    public function reativar(User $user){
        if (!$user->ativo) {
            $user->ativo = true;
            $user->save();
        }

        return redirect()->route('usuarios.index');
    }
}
