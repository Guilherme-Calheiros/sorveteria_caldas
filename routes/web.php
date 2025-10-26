<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmbalagemController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SaborController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('permissao.acesso:administrador')->name('dashboard');

    Route::resource('pedidos', PedidoController::class);

    Route::resource('usuarios', UserController::class)->middleware('permissao.acesso:administrador');
       
    Route::resource('funcionarios', FuncionarioController::class);
    Route::patch('funcionarios/{funcionario}/reativar', [FuncionarioController::class, 'reativar'])->name('funcionarios.reativar');
    Route::patch('funcionarios/{funcionario}/desativar', [FuncionarioController::class, 'desativar'])->name('funcionarios.desativar');

    Route::resource('sabores', SaborController::class);
    Route::patch('sabores/{sabor}/reativar', [SaborController::class, 'reativar'])->name('sabores.reativar');
    Route::patch('sabores/{sabor}/desativar', [SaborController::class, 'desativar'])->name('sabores.desativar');

    Route::resource('embalagens', EmbalagemController::class);
    Route::resource('cargos', CargoController::class)->middleware('permissao.acesso:administrador');
});

require __DIR__.'/auth.php';
