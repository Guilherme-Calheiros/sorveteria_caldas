<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sabor;
use Inertia\Inertia;

class SaborController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $sabores = Sabor::orderBy('name', 'asc')->paginate(10);
        return Inertia::render('Admin/Sabores/Index', [
            'sabores' => $sabores
        ]);
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
            'disponivel' => true
        ]);

        return redirect()->route('sabores.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sabor = Sabor::findOrFail($id);

        return $sabor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $sabor = Sabor::findOrFail($id);

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

        $sabor->disponivel = false;
        $sabor->save();

        return redirect()->route('sabores.index');
    }

    public function reativar(Sabor $sabor){
        if (!$sabor->disponivel) {
            $sabor->disponivel = true;
            $sabor->save();
        }

        return redirect()->route('sabores.index');
    }
}
