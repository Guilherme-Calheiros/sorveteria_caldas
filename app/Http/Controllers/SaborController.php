<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sabor;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SaborController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny');

        $sabores = Sabor::all();
        return Inertia::render('Sabores/Index', [
            'sabores' => $sabores
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create');

        return Inertia::render('Sabores/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' =>  'required|string|max:255',
        ]);

        Sabor::create([
            'name' => $validated['name'],
        ]);

        return redirect()->route('sabores.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sabor = Sabor::findOrFail($id);
        
        $this->authorize('view');

        return $sabor;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sabor = Sabor::findOrFail($id);

        $this->authorize('update');

        return Inertia::render('Sabores/Edit', [
            'sabor' => $sabor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sabor $sabor)
    {
        $validated = $request->validate([
            'name' =>  'required|string|max:255',
        ]);
    
        $sabor->update([
            'name' => $validated['name'],
        ]);
    
        return redirect()->route('sabores.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sabor = Sabor::findOrFail($id);

        $this->authorize('delete');

        $sabor->delete();

        return redirect()->route('sabores.index');
    }
}
