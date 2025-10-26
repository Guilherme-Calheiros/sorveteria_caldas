<?php

namespace Database\Seeders;

use App\Models\Cargo;
use App\Models\Embalagem;
use App\Models\Funcionario;
use App\Models\ItemPedido;
use App\Models\ItemPedidoSabor;
use App\Models\Pedido;
use App\Models\Sabor;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->administrador()->create([
            'name' => 'Administrador',
            'email' => 'admin@caldas.com',
            'password' => bcrypt('admin123*'),
        ]);

        User::factory()->caixa()->create([
            'name' => 'Caixa',
            'email' => 'caixa@caldas.com',
            'password' => bcrypt('caixa123*'),
        ]);

        $cargos = [
            'Atendente',
            'Caixa',
            'Gerente',
            'Supervisor',
            'Estoquista'
        ];

        foreach ($cargos as $cargo) {
            Cargo::firstOrCreate(['name' => $cargo]);
        }

        $sabores = [
            ['name' => 'Chocolate', 'color' => '#7B3F00'],
            ['name' => 'Morango', 'color' => '#FF4D6D'],
            ['name' => 'Baunilha', 'color' => '#F3E5AB'],
            ['name' => 'Napolitano', 'color' => '#D99B6C'],
            ['name' => 'Coco', 'color' => '#FFF8E7'],
            ['name' => 'Menta com Chocolate', 'color' => '#98FF98'],
            ['name' => 'Açaí', 'color' => '#5D1451'],
            ['name' => 'Doce de Leite', 'color' => '#D2A679'],
            ['name' => 'Pistache', 'color' => '#93C572'],
            ['name' => 'Creme', 'color' => '#FFFDD0'],
        ];

        foreach ($sabores as $sabor) {
            Sabor::firstOrCreate(
                ['name' => $sabor['name']],
                ['color' => $sabor['color'], 'disponivel' => true]
            );
        }

        $embalagens = [
            ['name' => 'Copo 300ml', 'maximo_sabores' => 2, 'preco_sabor_extra' => 2.00, 'valor_base' => 8.00],
            ['name' => 'Copo 500ml', 'maximo_sabores' => 3, 'preco_sabor_extra' => 2.50, 'valor_base' => 12.00],
            ['name' => 'Pote 1 Litro', 'maximo_sabores' => 4, 'preco_sabor_extra' => 3.00, 'valor_base' => 25.00],
            ['name' => 'Pote 2 Litros', 'maximo_sabores' => 5, 'preco_sabor_extra' => 3.50, 'valor_base' => 45.00],
            ['name' => 'Cascão Grande', 'maximo_sabores' => 2, 'preco_sabor_extra' => 1.50, 'valor_base' => 7.00],
        ];

        foreach ($embalagens as $embalagem) {
            Embalagem::firstOrCreate(['name' => $embalagem['name']], $embalagem);
        }

        $funcionarios = [
            [
                'name' => 'Guilherme',
                'cpf' => '12781637785',
                'telefone' => '21979599630',
                'cargo_id' => Cargo::where('name', 'Gerente')->first()->id,
                'data_admissao' => now(),
            ],
            [
                'name' => 'Ana',
                'cpf' => '12345678901',
                'telefone' => '21988887777',
                'cargo_id' => Cargo::where('name', 'Atendente')->first()->id,
                'data_admissao' => now(),
            ],
            [
                'name' => 'Carlos',
                'cpf' => '10987654321',
                'telefone' => '21977776666',
                'cargo_id' => Cargo::where('name', 'Caixa')->first()->id,
                'data_admissao' => now(),
            ],
        ];

        foreach ($funcionarios as $funcionario) {
            Funcionario::firstOrCreate(['cpf' => $funcionario['cpf']], $funcionario);
        }

        $userIds = User::pluck('id')->toArray();
        $saboresIds = Sabor::pluck('id')->toArray();
        $funcionariosIds = Funcionario::pluck('id')->toArray();

        $totalPedidos = 200;
        $inicio = now()->startOfMonth()->subMonths(5);
        $fim = now();

        $totalDias = $inicio->diffInDays($fim);

        $pedidosPorDia = [];
        $soma = 0;

        for ($d = 0; $d <= $totalDias; $d++) {

            $qtd = rand(0, 5);
            $pedidosPorDia[] = $qtd;
            $soma += $qtd;
        }

        $ajuste = $totalPedidos / max(1, $soma);
        $pedidosPorDia = array_map(fn($qtd) => max(0, round($qtd * $ajuste)), $pedidosPorDia);

        $diferenca = $totalPedidos - array_sum($pedidosPorDia);
        if ($diferenca !== 0) {
            for ($i = 0; abs($diferenca) > 0 && $i < count($pedidosPorDia); $i++) {
                $pedidosPorDia[$i] += ($diferenca > 0 ? 1 : -1);
                $diferenca += ($diferenca > 0 ? -1 : 1);
            }
        }

        $contador = 0;

        for ($dia = 0; $dia <= $totalDias; $dia++) {
            $dataBase = $inicio->copy()->addDays($dia);

            for ($n = 0; $n < $pedidosPorDia[$dia]; $n++) {
                if ($contador >= $totalPedidos) break 2;

                $pedidoData = $dataBase->copy()
                    ->setHour(rand(8, 20))
                    ->setMinute(rand(0, 59));

                $pedido = Pedido::create([
                    'user_id' => $userIds[array_rand($userIds)],
                    'funcionario_id' => $funcionariosIds[array_rand($funcionariosIds)],
                    'cliente_nome' => 'Cliente ' . ($contador + 1),
                    'observacao' => null,
                    'total' => 0,
                    'data_pedido' => $pedidoData,
                    'created_at' => $pedidoData,
                    'updated_at' => $pedidoData,
                ]);

                $valorTotal = 0;
                $numItens = rand(1, 3);

                for ($j = 0; $j < $numItens; $j++) {
                    $embalagem = Embalagem::inRandomOrder()->first();

                    $item = ItemPedido::create([
                        'pedido_id' => $pedido->id,
                        'embalagem_id' => $embalagem->id,
                        'quantidade' => 1,
                        'valor_unitario' => $embalagem->valor_base,
                        'created_at' => $pedidoData,
                        'updated_at' => $pedidoData,
                    ]);

                    $numSabores = rand(1, $embalagem->maximo_sabores);
                    $saboresAleatorios = array_rand($saboresIds, $numSabores);
                    if (!is_array($saboresAleatorios)) {
                        $saboresAleatorios = [$saboresAleatorios];
                    }

                    foreach ($saboresAleatorios as $saborIndex) {
                        ItemPedidoSabor::create([
                            'item_pedido_id' => $item->id,
                            'sabor_id' => $saboresIds[$saborIndex],
                            'created_at' => $pedidoData,
                            'updated_at' => $pedidoData,
                        ]);
                    }

                    $valorTotal += $item->valor_unitario;
                }

                $pedido->update(['total' => $valorTotal]);
                $contador++;
            }
        }
    }
}
