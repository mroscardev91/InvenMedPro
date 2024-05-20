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
            $sales = Sale::with('medicine')->get();
            $invoices = Invoice::with(['sale.medicine' => function($query) {
                $query->select('id', 'name', 'selling_price');
            }])->get();

            // Agregar el cálculo del total_amount
            foreach ($invoices as $invoice) {
                $invoice->total_amount = $invoice->sale->quantity * $invoice->sale->medicine->selling_price;
            }

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
                'sale' => 'required|exists:sales,id',
                'client_name' => 'required|string|max:255',
            ]);
    
            $invoiceNumber = 'Fac-' . Str::upper(Str::random(10));
    
            $invoice = Invoice::create([
                'sale_id' => $request->sale,
                'client_name' => $request->client_name,
                'invoice_number' => $invoiceNumber,
            ]);
    
            // Calcular el total_amount y actualizar la factura
            $sale = Sale::with('medicine')->find($request->sale);
            $totalAmount = $sale->quantity * $sale->medicine->selling_price;
            $invoice->update(['total_amount' => $totalAmount]);
    
            return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
        }
        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, string $id)
        {
            // Validar los datos de la solicitud
            $request->validate([
                'sale' => 'required|exists:sales,id',
                'client_name' => 'required|string|max:255',
            ]);

            // Encontrar la factura por su ID
            $invoice = Invoice::findOrFail($id);

            // Actualizar la factura con los nuevos datos
            $invoice->update([
                'sale_id' => $request->sale,
                'client_name' => $request->client_name,
            ]);

            // Calcular el total_amount y actualizar la factura
            $sale = Sale::with('medicine')->find($request->sale);
            $totalAmount = $sale->quantity * $sale->medicine->selling_price;
            $invoice->update(['total_amount' => $totalAmount]);

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

