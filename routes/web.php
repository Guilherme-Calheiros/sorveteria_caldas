<?php

use App\Http\Controllers\CargoController;
use App\Http\Controllers\EmbalagemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SaborController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/trocar-senha', function () {
        return Inertia::render('Auth/TrocarSenha');
    })->name('password.change');
});

Route::middleware(['auth', 'verified', 'permissao.acesso:acesso_total'])->group(function () {
    Route::resource('usuarios', UserController::class);
    Route::patch('usuarios/{user}/reativar', [UserController::class, 'reativar'])->name('usuarios.reativar');
    Route::resource('sabores', SaborController::class);
    Route::resource('embalagens', EmbalagemController::class);
    Route::resource('cargos', CargoController::class);
});

require __DIR__.'/auth.php';
