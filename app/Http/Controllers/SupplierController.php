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
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
        ]);

        $supplier = Supplier::create($request->all());  

        if($request->file('logo')){
            $pngName = strtolower($request->logo->getClientOriginalName());
            $fechaHoraActual = Carbon::now()->format('ymdHi');
            $request->logo->storeAS('/public/images/logos/'.$fechaHoraActual.$supplier->name.$pngName);
            $path_foto = "/storage/images/logos/".$fechaHoraActual.$supplier->name.$pngName;
            $supplier->logo=$path_foto;
            $url = Storage::url($pngName);
            $supplier->save();
        }
        
        return redirect()->back()->with('success', 'Proveedor creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
        ]);

        $supplier = Supplier::findOrFail($id);
        $supplier->update($request->all());

        // Actualizar la imagen del logotipo si se proporciona una nueva
        if ($request->hasFile('logo')) {
            $pngName = strtolower($request->logo->getClientOriginalName());
            $fechaHoraActual = Carbon::now()->format('ymdHi');
            $request->logo->storeAS('/public/images/logos/'.$fechaHoraActual.$supplier->name.$pngName);
            $path_foto = "/storage/images/logos/".$fechaHoraActual.$supplier->name.$pngName;
            $supplier->logo = $path_foto;
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
