<?php

namespace Database\Seeders;

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
    }
}
