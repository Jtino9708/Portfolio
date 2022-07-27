<?php

namespace App\Http\Controllers;

use App\Models\pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function index(){
        return pokemon::all();
    }

    function getOnePokemon($id){
        return pokemon::find($id);
    }
}
