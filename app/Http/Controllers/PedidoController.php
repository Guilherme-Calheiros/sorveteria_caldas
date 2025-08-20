<?php

namespace App\Http\Controllers;

use App\Models\Embalagem;
use App\Models\Pedido;
use App\Models\Sabor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index(){
        $pedidos = Pedido::with(['itensPedido', 'funcionario', 'user'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Pedidos/Index', [
            'pedidos' => $pedidos,
        ]);
    }

    public function show(string $pedidoId){
        $pedido = Pedido::with(['itensPedido', 'funcionario', 'user'])
            ->findOrFail($pedidoId);

        return Inertia::render('Admin/Pedidos/Show', [
            'pedido' => $pedido
        ]);
    }

    public function create(){
        $sabores = Sabor::orderBy('name')->get(['id', 'name']);
        $embalagens = Embalagem::orderBy('name')->get(['id', 'name', 'valor_base', 'maximo_sabores', 'preco_sabor_extra']);

        return Inertia::render('Admin/Pedidos/Create', [
            'sabores' => $sabores,
            'embalagens' => $embalagens
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'funcionario_id' => 'required|exists:funcionarios,id',
            'cliente_nome' => 'nullable|string',
            'observacao' => 'nullable|string',
            'itens' => 'required|array|min:1',
            'itens.*.embalagem_id' => 'required|exists:embalagens,id',
            'itens.*.quantidade' => 'required|integer|min:1',
            'itens.*.sabores' => 'required|array|min:1',
            'itens.*.sabores.*' => 'required|exists:sabores,id'
        ]);

        DB::beginTransaction();
        try{
            $pedido = Pedido::create([
                'user_id' => $validated['user_id'],
                'funcionario_id' => $validated['funcionario_id'],
                'cliente_nome' => $validated['cliente_nome'] ?? null,
                'observacao' => $validated['observacao'] ?? null,
                'data_pedido' => now(),
                'total' => 0,
            ]);

            foreach($validated['itens'] as $item){
                $embalagem = Embalagem::findOrFail($item['embalagem_id']);

                $quantidadeSabores = count($item['sabores']);
                $saboresExtras = max(0, $quantidadeSabores - $embalagem->maximo_sabores);
                $valorExtra = $saboresExtras * $embalagem->preco_sabor_extra;

                $valorUnitario = $embalagem->valor_base + $valorExtra;

                $itemPedido = $pedido->itensPedido()->create([
                    'embalagem_id' => $item['embalagem_id'],
                    'quantidade' => $item['quantidade'],
                    'valor_unitario' => $valorUnitario,
                ]);

                $itemPedido->sabores()->attach($item['sabores']);
            };

            $pedido->atualizarTotal();

            DB::commit();
            return redirect()->route('pedidos.index')->with('success', 'Pedido feito com sucesso!');
            
        } catch (\Throwable $e){
            DB::rollBack();
            return redirect()->back()->withErrors(['erro' => 'Falha ao criar pedido: ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, int $pedidoId)
    {
        $pedido = Pedido::findOrFail($pedidoId);

        $validated = $request->validate([
            'cliente_nome' => 'nullable|string',
            'observacao' => 'nullable|string',
            'itens' => 'nullable|array|min:1',
            'itens.*.embalagem_id' => 'required|exists:embalagens,id',
            'itens.*.quantidade' => 'required|integer|min:1',
            'itens.*.sabores' => 'required|array|min:1',
            'itens.*.sabores.*' => 'required|exists:sabores,id'
        ]);

        DB::beginTransaction();
        try {

            $pedido->update([
                'cliente_nome' => $validated['cliente_nome'] ?? $pedido->cliente_nome,
                'observacao' => $validated['observacao'] ?? $pedido->observacao,
            ]);

            if (!empty($validated['itens'])) {
                $itensAtuais = $pedido->itensPedido()->with('sabores')->get()->map(function($item) {
                    return [
                        'embalagem_id' => $item->embalagem_id,
                        'quantidade' => $item->quantidade,
                        'sabores' => $item->sabores->pluck('id')->sort()->values()->all(),
                    ];
                })->sortBy('embalagem_id')->values()->all();

                $itensMudaram = $validated['itens'] != $itensAtuais;

                if ($itensMudaram) {
                    $pedido->itensPedido()->each(function($item) {
                        $item->sabores()->detach();
                        $item->delete();
                    });

                    foreach ($validated['itens'] as $item) {
                        $embalagem = Embalagem::findOrFail($item['embalagem_id']);
                        $quantidadeSabores = count($item['sabores']);
                        $saboresExtras = max(0, $quantidadeSabores - $embalagem->maximo_sabores);
                        $valorUnitario = $embalagem->valor_base + ($saboresExtras * $embalagem->preco_sabor_extra);

                        $itemPedido = $pedido->itensPedido()->create([
                            'embalagem_id' => $item['embalagem_id'],
                            'quantidade' => $item['quantidade'],
                            'valor_unitario' => $valorUnitario,
                        ]);

                        $itemPedido->sabores()->attach($item['sabores']);
                    }

                    $pedido->atualizarTotal();
                }
            }

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Pedido atualizado com sucesso!', 'total' => $pedido->total]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Falha ao atualizar pedido: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(int $pedidoId)
    {
        $pedido = Pedido::findOrFail($pedidoId);

        DB::beginTransaction();
        try {

            foreach ($pedido->itensPedido as $item) {
                $item->sabores()->detach();
            }
            $pedido->itensPedido()->delete();

            $pedido->delete();

            DB::commit();
            return redirect()->route('pedidos.index')->with('success', 'Pedido excluído com sucesso!');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['erro' => 'Falha ao excluir pedido: ' . $e->getMessage()]);
        }
    }

}
