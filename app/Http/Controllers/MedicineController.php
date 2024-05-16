<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Medicine;
use App\Models\Category;


class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        $medicines = Medicine::with('category')->get();
        return Inertia::render('Medicine/Index', [
            'medicines' => $medicines,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request-> validate([
            'name' => 'required',
            'details' => 'required',
            'purchase_price' => 'required',
            'selling_price' => 'required',
            'category' => 'required',
        ]);

        // Generar código de lote único
        $batchNumber = 'L' . date('Ymd') . Str::random(5);

        $medicine = Medicine::create([
            'name' => $request->name,
            'details' => $request->details,
            'purchase_price' => $request->purchase_price,
            'selling_price' => $request->selling_price,
            'category_id' => $request->category,
            'batch_number' => $batchNumber, // Asignar el código de lote
        ]);

        return redirect()->back()->with('success', 'Medicamento creado exitosamente.');

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'details' => 'required',
            'purchase_price' => 'required',
            'selling_price' => 'required',
            'category' => 'required',
        ]);

        $medicine = Medicine::findOrFail($id);
        $medicine->update([
            'name' => $request->name,
            'details' => $request->details,
            'purchase_price' => $request->purchase_price,
            'selling_price' => $request->selling_price,
            'category_id' => $request->category,
        ]);

        return redirect()->back()->with('success', 'Medicamento actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $medicine = Medicine::find($id);
        $medicine->delete();
        return redirect()->back()->with('success', 'Medicamento eliminado exitosamente.');
    }
}
