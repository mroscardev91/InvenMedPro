<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //roles
        $system_admin = Role::create(['name' => 'Administrador del Sistema']);
        $inventory_manager = Role::create(['name' => 'Administrador del Inventario']);
        $patient_manager = Role::create(['name' => 'Administrador de Pacientes']);

        //permissions
        $permissions = ['users.index', 'categories.index',];

        //Crea el permiso en la base de datos mediante la lista anterior
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        //Asigna los permisos a un rol
        $system_admin->givePermissionTo($permissions);

        $inventory_manager->givePermissionTo('categories.index');


        $user_admin = User::create([
            'name' => 'admin', 
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        $user_inventory = User::create([
            'name' => 'inventory', 
            'email' => 'inventory@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        //Le asigna el rol administrador
        $user_admin->assignRole([$system_admin->id]);
        $user_inventory->assignRole([$inventory_manager->id]);
    }
}
