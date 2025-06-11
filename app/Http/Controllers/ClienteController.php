<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'nullable|string|max:14',
        ]);

        if (!empty($validated['cpf'])) {
            $cliente = Cliente::where('cpf', $validated['cpf'])->first();

            if ($cliente) {
                return response()->json($cliente);
            }
        }

        $cliente = Cliente::create($validated);

        return response()->json($cliente, 201);
    }
}
