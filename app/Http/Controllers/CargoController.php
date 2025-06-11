<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CargoController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('Cargos/Index', [
            'cargos' => Cargo::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'permissao' => 'required|in:acesso_total,acesso_limitado',
        ]);

        Cargo::create([
            'name' => $validated['name'],
            'permissao' => $validated['permissao'],
        ]);

        return redirect()->route('cargos.index');
    }

    public function update(Request $request, $id)
    {
        $cargo = Cargo::findOrFail($id);

        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'permissao' => 'required|in:acesso_total,acesso_limitado',
        ]);
    
        $cargo->update([
            'name' => $validated['name'],
            'permissao' => $validated['permissao'],
        ]);
    
        return redirect()->route('cargos.index');
    }

    public function destroy(string $id)
    {
        $cargo = Cargo::findOrFail($id);

        $cargo->delete();

        return redirect()->route('cargos.index');
    }
}
