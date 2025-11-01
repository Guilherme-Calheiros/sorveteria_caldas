<?php

namespace App\Http\Controllers;

use App\Models\Embalagem;
use App\Models\Funcionario;
use App\Models\Pedido;
use App\Models\Sabor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Psy\debug;

class DashboardController extends Controller
{
    public function index(Request $request){

        $periodo = $request->get('periodo', 'hoje');
        [$inicio, $fim] = $this->getPeriodoDatas($periodo);

        $topSabores = DB::table('itens_pedido_sabor')
            ->join('sabores', 'itens_pedido_sabor.sabor_id', '=', 'sabores.id')
            ->select('sabores.name', DB::raw('COUNT(itens_pedido_sabor.id) as total'))
            ->groupBy('sabores.name')
            ->when($inicio, fn($q) => $q->whereBetween('itens_pedido_sabor.created_at', [$inicio, $fim]))
            ->orderByDesc('total')
            ->limit(5)
            ->get();
            

        $topEmbalagens = DB::table('itens_pedido')
            ->join('embalagens', 'itens_pedido.embalagem_id', '=', 'embalagens.id')
            ->select('embalagens.name', DB::raw('COUNT(itens_pedido.id) as total'))
            ->groupBy('embalagens.name')
            ->when($inicio, fn($q) => $q->whereBetween('itens_pedido.created_at', [$inicio, $fim]))
            ->orderByDesc('total')
            ->limit(5)
            ->get();


        $ultimosPedidos = Pedido::with('funcionario')
            ->latest()
            ->take(15)
            ->get();

        
        $pedidosPeriodo = Pedido::whereBetween('created_at', [$inicio, $fim])->get();
        $totalPedidos = $pedidosPeriodo->count();  
        $totalVendas = $pedidosPeriodo->sum('total');
        $ticketMedio = $pedidosPeriodo->count() ? $totalVendas / $pedidosPeriodo->count() : 0;

        
        $pedidosAgrupados = DB::table('pedidos')
            ->select(
                DB::raw("COUNT(*) as quantidade"),
                DB::raw("SUM(total) as valor"),
                DB::raw(match ($periodo) {
                    'hoje' => "DATE_FORMAT(created_at, '%H:00')",
                    'semana', 'mes' => "DATE_FORMAT(created_at, '%Y-%m-%d')",
                    'ano' => "DATE_FORMAT(created_at, '%Y-%m')",
                } . " as periodo")
            )
            ->whereBetween('created_at', [$inicio, $fim])
            ->groupBy('periodo')
            ->get()
            ->keyBy('periodo');

        $pedidosNoPeriodo = $this->gerarIntervalosComTotais($pedidosAgrupados, $inicio, $fim, $periodo);

        $funcionariosAtivos = Funcionario::where('ativo', true)->count();
        $totalSabores = Sabor::where('disponivel', true)->count();
        $totalEmbalagens = Embalagem::count();


        
        return Inertia::render('Dashboard', compact(
            'ultimosPedidos',
            'pedidosNoPeriodo',
            'totalVendas',
            'totalPedidos',
            'ticketMedio',
            'topSabores',
            'topEmbalagens',
            'funcionariosAtivos',
            'totalSabores',
            'totalEmbalagens',
            'periodo'
        ));
    }


    private function getPeriodoDatas(string $periodo): array
    {
        $agora = Carbon::now();

        return match ($periodo) {
            'hoje' => [
                Carbon::today()->startOfDay(),
                $agora,
            ],
            'semana' => [
                $agora->copy()->startOfWeek(),
                $agora,
            ],
            'mes' => [
                $agora->copy()->startOfMonth(),
                $agora,
            ],
            'ano' => [
                $agora->copy()->startOfYear(),
                $agora,
            ],
            default => [null, null],
        };
    }

    private function gerarIntervalosComTotais($pedidosAgrupados, $inicio, $fim, $periodo)
    {
        if ($fim->lt($inicio)) {
            [$inicio, $fim] = [$fim, $inicio];
        }

        $diferenca = match ($periodo) {
            'hoje' => intval(max(0, $inicio->diffInHours($fim))),
            'semana', 'mes' => intval(max(0, $inicio->diffInDays($fim))),
            'ano' => intval(max(0, $inicio->diffInMonths($fim))),
            default => 0,
        };

        if ($diferenca === 0) {
            $intervalos = collect([$inicio->format(match ($periodo) {
                'hoje' => 'H:00',
                'semana', 'mes' => 'Y-m-d',
                'ano' => 'Y-m',
            })]);
        } else {
            $intervalos = match ($periodo) {
                'hoje' => collect(range(0, $diferenca))
                    ->map(fn($h) => $inicio->copy()->addHours($h)->format('H:00')),
                'semana', 'mes' => collect(range(0, $diferenca))
                    ->map(fn($d) => $inicio->copy()->addDays($d)->format('Y-m-d')),
                'ano' => collect(range(0, $diferenca))
                    ->map(fn($m) => $inicio->copy()->addMonths($m)->format('Y-m')),
            };
        }

        return $intervalos->map(fn($p) => [
            'periodo' => $p,
            'quantidade' => $pedidosAgrupados[$p]->quantidade ?? 0,
            'valor' => $pedidosAgrupados[$p]->valor ?? 0,
        ]);
    }

    // private function getPeriodoDatas(string $periodo): array
    // {
    //     $agora = Carbon::now();

    //     return match ($periodo) {
    //         'hoje' => [Carbon::today(), Carbon::today()->endOfDay()],
    //         'semana' => [$agora->copy()->startOfWeek(), $agora->copy()->endOfWeek()],
    //         'mes' => [$agora->copy()->startOfMonth(), $agora->copy()->endOfMonth()],
    //         'ano' => [$agora->copy()->startOfYear(), $agora->copy()->endOfYear()],
    //         default => [null, null],
    //     };
    // }
}
