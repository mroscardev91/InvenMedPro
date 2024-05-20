<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Sale;
use App\Models\Invoice;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::all();
        $invoices = Invoice::with('sale.medicine')->get();
        return Inertia::render('Invoice/Index', [
            'invoices' => $invoices,
            'sales' => $sales,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $request->validate([
            'sale' => 'required',
            'client_name' => 'required|string|max:255',
        ]);


        $invoiceNumber = 'Fac-' . Str::upper(Str::random(10));

        $hola = Invoice::create([
            'sale_id' => $request->sale,
            'client_name' => $request->client_name,
            'invoice_number' => $invoiceNumber,
        ]);


        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validar los datos de la solicitud
        $request->validate([
            'sale' => 'required',
            'client_name' => 'required|string|max:255',
        ]);

        // Encontrar la factura por su ID
        $invoice = Invoice::findOrFail($id);

        // Actualizar la factura con los nuevos datos
        $invoice->update([
            'sale_id' => $request->sale,
            'client_name' => $request->client_name,
        ]);

        // Redirigir con un mensaje de éxito
        return redirect()->route('invoices.index')->with('success', 'Factura actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Método para eliminar una factura
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return redirect()->route('invoices.index')->with('success', 'Factura eliminada correctamente.');
    }
}

