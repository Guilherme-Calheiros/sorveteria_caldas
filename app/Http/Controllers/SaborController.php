<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sabor;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class SaborController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Sabor::class);

        $sabores = Sabor::orderBy('id', 'asc')->paginate(12);
        return Inertia::render('Sabores/Index', [
            'sabores' => $sabores
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Sabor::class);

        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'color' => 'nullable|string|size:7',
        ]);

        Sabor::create([
            'name' => $validated['name'],
            'disponivel' => true,
            'color' => $validated['color'] ?? '#ffffff',
        ]);

        return redirect()->route('sabores.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', Sabor::class);

        $sabor = Sabor::findOrFail($id);

        return $sabor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $this->authorize('update', Sabor::class);

        $sabor = Sabor::findOrFail($id);

        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'color' => 'nullable|string|size:7',
        ]);
    
        $sabor->update([
            'name' => $validated['name'],
            'color' => $validated['color'] ?? $sabor->color,
        ]);
    
        return redirect()->route('sabores.index');
    }


        public function destroy(string $id)
    {
        $this->authorize('delete', Sabor::class);

        $sabor = Sabor::findOrFail($id);

        $sabor->delete();

        return redirect()->route('sabores.index');
    }

    public function desativar(string $id)
    {
        $this->authorize('desativar', Sabor::class);

        $sabor = Sabor::findOrFail($id);

        $sabor->disponivel = false;
        $sabor->save();

        return redirect()->route('sabores.index');
    }

    public function reativar(Sabor $sabor){

        $this->authorize('reativar', $sabor);

        if (!$sabor->disponivel) {
            $sabor->disponivel = true;
            $sabor->save();
        }

        return redirect()->route('sabores.index');
    }
}
