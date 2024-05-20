<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Entry;
use App\Models\Sale;
use App\Models\Medicine;
use App\Models\Supplier;
use App\Models\Category;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoriesCount = Category::count();
        $medicinesCount = Medicine::count();
        $suppliersCount = Supplier::count();
        $entriesCount = Entry::sum('quantity');
        $salesCount = Sale::sum('quantity');
        $stockCount = Medicine::sum('stock');
        $systemAdminsCount = Role::findByName('Administrador del Sistema')->users()->count();
        $inventoryAdminsCount = Role::findByName('Administrador del Inventario')->users()->count();


        // Calcular el importe total vendido
        $totalSalesAmount = DB::table('sales')
        ->join('medicines', 'sales.medicine_id', '=', 'medicines.id')
        ->sum(DB::raw('sales.quantity * medicines.selling_price'));

        //Calcular el importe total comprado
        $totalPurchasesAmount = DB::table('entries')
        ->join('medicines', 'entries.medicine_id', '=', 'medicines.id')
        ->sum(DB::raw('entries.quantity * medicines.purchase_price'));

        //Calcular beneficio
        $benefit = $totalSalesAmount - $totalPurchasesAmount;

        // Obtener los 5 medicamentos más vendidos
        $topMedicines = DB::table('sales')
            ->join('medicines', 'sales.medicine_id', '=', 'medicines.id')
            ->select('medicines.name', DB::raw('SUM(sales.quantity) as total_sold'))
            ->groupBy('medicines.name')
            ->orderBy('total_sold', 'DESC')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return (array) $item;
            })
            ->toArray();

        // Obtener los 5 proveedores con más medicamentos comprados
        $topSuppliers = DB::table('entries')
            ->join('suppliers', 'entries.supplier_id', '=', 'suppliers.id')
            ->select('suppliers.name', DB::raw('SUM(entries.quantity) as total_purchased'))
            ->groupBy('suppliers.name')
            ->orderBy('total_purchased', 'DESC')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return (array) $item;
            })
            ->toArray();

        return Inertia::render('Dashboard/Index', [
            'categoriesCount' => $categoriesCount,
            'medicinesCount' => $medicinesCount,
            'suppliersCount' => $suppliersCount,
            'entriesCount' => $entriesCount,
            'salesCount' => $salesCount,
            'stockCount' => $stockCount,
            'systemAdminsCount' => $systemAdminsCount,
            'inventoryAdminsCount' => $inventoryAdminsCount,
            'totalSalesAmount' => $totalSalesAmount,
            'totalPurchasesAmount' => $totalPurchasesAmount,
            'benefit' => $benefit,
            'topMedicines' => $topMedicines,
            'topSuppliers' => $topSuppliers,
        ]);
    }

}
