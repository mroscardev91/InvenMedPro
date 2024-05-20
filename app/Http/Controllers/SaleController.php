<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Sale;
use App\Models\Medicine;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicines = Medicine::where('stock', '>', 0)->get();
        $sales = Sale::with('medicine', 'medicine.category', 'user',)->get();
        return Inertia::render('Sale/Index', [
            'sales' => $sales,
            'medicines' => $medicines,
        ]);

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'medicine' => 'required',
            'quantity' => 'required',
            'date' => 'required',
        ]);

        // Obtener el ID del usuario autenticado
        $userId = Auth::id();

        // Generar el prefijo alfanumérico aleatorio
        $prefix = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 5);

        // Obtener el ID de la nueva venta
        $latestSale = Sale::latest()->first();
        $latestSaleId = $latestSale ? $latestSale->id + 1 : 1;

        // Generar el sufijo con la fecha y hora actual
        $suffix = date('YmdHis');

        $transactionCode = $prefix . '-' . $latestSaleId . '-' . $suffix;

        // Actualizar el stock del medicamento correspondiente
        $medicine = Medicine::find($request->medicine);
        if ($medicine->stock < $request->quantity) {
            
            return redirect()->back()->with('error', 'Stock insuficiente para realizar la venta.');
        }


        $sale = Sale::create([
            'medicine_id' => $request->medicine,
            'user_id' => $userId,
            'transaction_code' => $transactionCode,
            'quantity' => $request->quantity,
            'date' => $request->date,
        ]);
  
        $medicine->stock -= $request->quantity;
        $medicine->save();

        return redirect()->back()->with('success', 'Venta realizada exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'medicine' => 'required',
            'quantity' => 'required',
            'date' => 'required',
        ]);

        // Encontrar la venta existente
        $sale = Sale::findOrFail($id);
        $medicine = Medicine::findOrFail($sale->medicine_id);

        // Calcular la diferencia en la cantidad
        $quantityDifference = $request->quantity - $sale->quantity;

        // Verificar si hay suficiente stock para la actualización
        if ($quantityDifference > 0 && $medicine->stock < $quantityDifference) {
            return redirect()->back()->with('error', 'Stock insuficiente para actualizar la venta.');
        }

        // Actualizar el stock del medicamento
        $medicine->stock -= $quantityDifference;
        $medicine->save();

        // Actualizar la venta
        $sale->medicine_id = $request->medicine;
        $sale->quantity = $request->quantity;
        $sale->date = $request->date;
        $sale->save();

        return redirect()->back()->with('success', 'Venta actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Encontrar la venta existente
        $sale = Sale::findOrFail($id);
        $medicine = Medicine::findOrFail($sale->medicine_id);

        // Restaurar el stock del medicamento
        $medicine->stock += $sale->quantity;
        $medicine->save();

        // Eliminar la venta
        $sale->delete();

        return redirect()->back()->with('success', 'Venta eliminada exitosamente.');
    }
}
