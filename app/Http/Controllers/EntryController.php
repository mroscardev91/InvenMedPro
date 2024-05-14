<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Entry;
use App\Models\Medicine;
use App\Models\Supplier;
use Illuminate\Support\Facades\Auth;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicines = Medicine::all();
        $suppliers = Supplier::all();
        $entries = Entry::with('medicine', 'medicine.category', 'supplier', 'user',)->get();
        return Inertia::render('Entry/Index', [
            'entries' => $entries,
            'medicines' => $medicines,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'medicine' => 'required',
            'supplier' => 'required',
            'quantity' => 'required',
            'date' => 'required',
        ]);

        // Obtener el ID del usuario autenticado
        $userId = Auth::id();

        // Generar el prefijo alfanumérico aleatorio
        $prefix = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 5);

        // Obtener el ID de la nueva entrada
        $latestEntry = Entry::latest()->first();
        $latestEntryId = $latestEntry ? $latestEntry->id + 1 : 1;

        // Generar el sufijo con la fecha y hora actual
        $suffix = date('YmdHis');

        $transactionCode = $prefix . '-' . $latestEntryId . '-' . $suffix;


        $entry = Entry::create([
            'medicine_id' => $request->medicine,
            'supplier_id' => $request->supplier,
            'user_id' => $userId,
            'transaction_code' => $transactionCode,
            'quantity' => $request->quantity,
            'date' => $request->date,
        ]);

        // Actualizar el stock del medicamento correspondient
        $medicine = Medicine::find($request->medicine);
        $medicine->stock += $request->quantity;
        $medicine->save();

        return redirect()->back()->with('success', 'Entrada creada exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'medicine' => 'required',
            'supplier' => 'required',
            'quantity' => 'required',
            'date' => 'required',
        ]);

        // Obtener el ID del usuario autenticado
        $userId = Auth::id();

        $entry = Entry::findOrFail($id);
        $entry->update([
            'medicine_id' => $request->medicine,
            'supplier_id' => $request->supplier,
            'user_id' => $userId,
            'quantity' => $request->quantity,
            'date' => $request->date,
        ]);

        return redirect()->back()->with('success', 'Entrada actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $entry = Entry::find($id);
        $entry->delete();
        return redirect()->back()->with('success', 'Medicamento eliminado exitosamente.');
    }
}
