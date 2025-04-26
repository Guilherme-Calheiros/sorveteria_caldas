<?php

use App\Http\Controllers\CargoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/cargos', [CargoController::class, 'index']);
