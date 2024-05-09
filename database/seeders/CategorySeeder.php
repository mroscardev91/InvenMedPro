<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Analgésicos',
            'details' => 'Para el dolor',
        ]);

        Category::create([
            'name' => 'Antibióticos',
            'details' => 'Para tratar infecciones bacterianas',
        ]);

        Category::create([
            'name' => 'Antidepresivos',
            'details' => 'Para tratar trastornos del estado de ánimo',
        ]);

        Category::create([
            'name' => 'Antihistamínicos',
            'details' => 'Para tratar alergias',
        ]);

        Category::create([
            'name' => 'Antiinflamatorios',
            'details' => 'Para tratar inflamaciones',
        ]);

        Category::create([
            'name' => 'Antipiréticos',
            'details' => 'Para tratar fiebre',
        ]);
    }
}
