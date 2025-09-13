<?php

namespace Database\Seeders;

use App\Models\Cargo;
use App\Models\Embalagem;
use App\Models\Funcionario;
use App\Models\Sabor;
use App\Models\User;
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
            'Chocolate',
            'Morango',
            'Baunilha',
            'Napolitano',
            'Coco',
            'Menta com Chocolate',
            'Açaí',
            'Doce de Leite',
            'Pistache',
            'Creme'
        ];

        foreach ($sabores as $sabor) {
            Sabor::firstOrCreate(['name' => $sabor]);
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
            ]
        ];

        foreach ($funcionarios as $funcionario) {
            Funcionario::firstOrCreate(['cpf' => $funcionario['cpf']], $funcionario);
        }
    }
}
