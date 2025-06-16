<?php

namespace App\Http\Controllers;

use App\Models\Embalagem;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index(){
        $pedidos = Pedido::with(['itensPedido', 'funcionario', 'cliente'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Pedidos/index', [
            'pedidos' => $pedidos,
        ]);
    }

    public function show(string $pedidoId){
        $pedido = Pedido::with(['itensPedido', 'funcionario', 'cliente'])
            ->findOrFail($pedidoId);

        return Inertia::render('Pedidos/show', [
            'pedido' => $pedido
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'funcionario_id' => 'nullable|exists:users,id',
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
                'cliente_id' => $validated['cliente_id'],
                'funcionario_id' => $validated['funcionario_id'] ?? null,
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

            $pedido->load('itensPedido.sabores');
            $pedido->atualizarTotal();

            DB::commit();
            return redirect()->route('pedidos.index')->with('success', 'Pedido feito com sucesso!');
            
        } catch (\Throwable $e){
            DB::rollBack();
            return redirect()->back()->withErrors(['erro' => 'Falha ao criar pedido: ' . $e->getMessage()]);
        }
    }
}
