<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Medicine;
use App\Models\Category;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        // Obtener los medicamentos cuyo stock sea mayor a cero
        $medicines = Medicine::with('category')->where('stock', '>', 0)->get();

        return Inertia::render('Stock/Index', [
            'medicines' => $medicines,
            'categories' => $categories,
        ]);
    }

}
