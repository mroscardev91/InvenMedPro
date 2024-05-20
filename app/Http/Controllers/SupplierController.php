<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;


class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Supplier/Index', [
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'phone' => 'required|string',
        'address' => 'required|string',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validación del logo
    ]);

    $supplier = Supplier::create($request->except('logo')); // Crear sin logo inicialmente

    if ($request->hasFile('logo')) {
        $filename = time() . '_' . $request->file('logo')->getClientOriginalName();
        $path = $request->file('logo')->storeAs('public/images/logos', $filename);
        $supplier->logo = Storage::url($path);
        $supplier->save();
    }

    return redirect()->back()->with('success', 'Proveedor creado exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'phone' => 'required|string',
        'address' => 'required|string',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validación del logo
    ]);


    $supplier = Supplier::findOrFail($id);
    $supplier->update($request->except('logo'));

    if ($request->hasFile('logo')) {

        // Eliminar el logo anterior si existe
        if ($supplier->logo) {
            Storage::delete(str_replace('/storage/', 'public/', $supplier->logo));
        }

        $filename = time() . '_' . $request->file('logo')->getClientOriginalName();
        $path = $request->file('logo')->storeAs('public/images/logos', $filename);
        $supplier->logo = Storage::url($path);
        $supplier->save();
    }

    return redirect()->back()->with('success', 'Proveedor actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Supplier::findOrFail($id);

        // Eliminar la imagen del storage si existe
        if ($supplier->logo) {
            // Obtener la ruta completa del archivo en el sistema de archivos
            $filePath = public_path($supplier->logo);

            // Verificar si el archivo existe antes de intentar eliminarlo
            if (file_exists($filePath)) {
                // Eliminar el archivo del sistema de archivos
                unlink($filePath);
            }
        }

        $supplier->delete();
        return redirect()->back()->with('success', 'Proveedor eliminado exitosamente.');
    }
}
