<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FuncionarioController extends Controller
{

    public function index()
    {
        $funcionarios = Funcionario::orderBy('name')->paginate(10);
        $cargos = Cargo::select('id', 'name')->get();
        return Inertia::render('Admin/Funcionarios/Index', [
            'funcionarios' => $funcionarios,
            'cargos' => $cargos,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|max:14|unique:funcionarios,cpf',
            'telefone' => 'nullable|string|max:15',
            'cargo_id' => 'required|exists:cargos,id',
        ]);

        Funcionario::create([
            'name' => $validated['name'],
            'cpf' => $validated['cpf'],
            'telefone' => $validated['telefone'],
            'cargo_id' => $validated['cargo_id'],
            'ativo' => true,
            'data_admissao' => now()->toDateString(),
        ]);


        return redirect()->route('funcionarios.index');
    }

    public function show(string $id)
    {
        $funcionario = Funcionario::findOrFail($id);
        return $funcionario;
    }

    public function update(Request $request, $id)
    {
        $funcionario = Funcionario::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => [
                'required',
                'string',
                'max:14',
                Rule::unique('funcionarios', 'cpf')->ignore($funcionario->id),
            ],
            'telefone' => 'nullable|string|max:15',
            'cargo_id' => 'required|exists:cargos,id',
        ]);

        $funcionario->update([
            'name' => $validated['name'],
            'cpf' => $validated['cpf'],
            'telefone' => $validated['telefone'],
            'cargo_id' => $validated['cargo_id'],
        ]);

        return redirect()->route('funcionarios.index');
    }

    public function destroy(string $id)
    {
        $funcionario = Funcionario::findOrFail($id);

        $funcionario->ativo = false;
        $funcionario->save();

        return redirect()->route('funcionarios.index');
    }

    public function reativar(Funcionario $funcionario){
        if (!$funcionario->ativo) {
            $funcionario->ativo = true;
            $funcionario->save();
        }

        return redirect()->route('funcionarios.index');
    }
}
