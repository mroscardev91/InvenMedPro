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
        $system_admin = Role::create(['name' => 'system_admin']);
        $inventory_manager = Role::create(['name' => 'inventory_manager']);
        $patient_manager = Role::create(['name' => 'patient_manager']);

        //permissions
        $permissions = [];

        //Crea el permiso en la base de datos mediante la lista anterior
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $user_admin = User::create([
            'name' => 'admin', 
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        //Le asigna el rol administrador
        $user_admin->assignRole([$system_admin->id]);
    }
}
