<?php

namespace App\Http\Controllers;

use App\Models\Embalagem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmbalagemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $embalagens = Embalagem::orderBy('id', 'asc')->paginate(10);
        return Inertia::render('Admin/Embalagens/Index', [
            'embalagens' => $embalagens
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'maximo_sabores' =>  'required|integer',
            'preco_sabor_extra' => 'required|numeric|between:0,999999.99',
            'valor_base' => 'required|numeric|between:0,999999.99',
        ]);

        Embalagem::create([
            'name' => $validated['name'],
            'maximo_sabores' => $validated['maximo_sabores'],
            'preco_sabor_extra' => $validated['preco_sabor_extra'],
            'valor_base' => $validated['valor_base'],
        ]);

        return redirect()->route('embalagens.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $embalagem = Embalagem::findOrFail($id);

        return $embalagem;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $embalagem = Embalagem::findOrFail($id);

        $validated = $request->validate([
            'name' =>  'required|string|max:255',
            'maximo_sabores' =>  'required|integer',
            'preco_sabor_extra' => 'required|numeric|between:0,999999.99',
            'valor_base' => 'required|numeric|between:0,999999.99',
        ]);
    
        $embalagem->update([
            'name' => $validated['name'],
            'maximo_sabores' => $validated['maximo_sabores'],
            'preco_sabor_extra' => $validated['preco_sabor_extra'],
            'valor_base' => $validated['valor_base'],
        ]);
    
        return redirect()->route('embalagens.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $embalagem = Embalagem::findOrFail($id);

        $embalagem->delete();

        return redirect()->route('embalagens.index');
    }
}
