<?php

namespace App\Http\Controllers;

use App\Models\Embalagem;
use App\Models\Funcionario;
use App\Models\Pedido;
use App\Models\Sabor;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidoController extends Controller
{
    use AuthorizesRequests;

    public function index(){

        $this->authorize('viewAny', Pedido::class);

        $sabores = Sabor::orderBy('name')->get(['id', 'name', 'disponivel']);
        $embalagens = Embalagem::orderBy('name')->get(['id', 'name', 'valor_base', 'maximo_sabores', 'preco_sabor_extra']);
        $funcionarios = Funcionario::orderBy('name')->get(['id', 'name']);

        $pedidos = Pedido::with(['itensPedido.sabores', 'itensPedido.embalagem', 'funcionario', 'user'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Pedidos/Index', [
            'pedidos' => $pedidos,
            'sabores' => $sabores,
            'funcionarios' => $funcionarios,
            'embalagens' => $embalagens
        ]);
    }

    public function show(string $pedidoId){
        
        $this->authorize('view', Pedido::class);

        $pedido = Pedido::with(['itensPedido.sabores', 'itensPedido.embalagem', 'funcionario', 'user'])
            ->findOrFail($pedidoId);

        return Inertia::render('Admin/Pedidos/Show', [
            'pedido' => $pedido
        ]);
    }

    public function store(Request $request){

        $this->authorize('create', Pedido::class);

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

}
