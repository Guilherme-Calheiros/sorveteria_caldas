<?php

namespace App\Http\Controllers;

use App\Models\Cargo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CargoController extends Controller
{
    use AuthorizesRequests;

    public function index(){
        $this->authorize('viewCargos', Cargo::class);

        return Cargo::all();
    }
}
