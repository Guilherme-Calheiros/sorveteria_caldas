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
            'cargos' => Cargo::orderBy('id', 'asc')->paginate(12),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' =>  'required|string|max:255',
        ]);

        Cargo::create([
            'name' => $validated['name'],
        ]);

        return redirect()->route('cargos.index');
    }

    public function update(Request $request, $id)
    {
        $cargo = Cargo::findOrFail($id);

        $validated = $request->validate([
            'name' =>  'required|string|max:255',
        ]);
    
        $cargo->update([
            'name' => $validated['name'],
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
