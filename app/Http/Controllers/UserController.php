<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        $users = User::with('roles')->get();

        // Para manejar los usuarios sin rol asignado
        $users->each(function ($user) {
            if ($user->roles->isEmpty()) {
                $user->role = 'Aún no se le ha asignado un rol';
            } else {
                $user->role = $user->roles->first()->name;
            }
        });


        return Inertia::render('User/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request-> validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required',
        ]);


        $user = User::create($request->except('role')); 
        $role = Role::findOrFail($request->input('role')); 
        $user->assignRole($role); 
        return redirect()->back()->with('success', 'Usuario creado exitosamente.');
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'role' => 'required',
        ]);

        $user = User::find($id);
        $user->fill($request->input())->saveOrFail();
        $role = Role::findOrFail($request->input('role'));
        $user->syncRoles([$role]);
        return redirect()->back()->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->back()->with('success', 'Usuario eliminado exitosamente.');
    }

    public function unauthorized()
    {
        // Obtener el rol del usuario actual
        $userRole = auth()->user()->getRole();


        // Renderizar la vista y pasar el rol como una variable
        return Inertia::render('Unauthorized/Index', [
            'userRole' => $userRole,
        ]);
    }

}
