<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medicine;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Medicine::create([
            'name' => 'Paracetamol',
            'details' => 'Alivia el dolor y reduce la fiebre',
            'purchase_price' => '1.50',
            'selling_price' => '2.00',
            'category_id' => 1,
        ]);
        
        Medicine::create([
            'name' => 'Ibuprofeno',
            'details' => 'Alivia el dolor y reduce la fiebre',
            'purchase_price' => '2.00',
            'selling_price' => '2.50',
            'category_id' => 1,
        ]);

        Medicine::create([
            'name' => 'Naproxeno',
            'details' => 'Reduce el dolor y la inflamación',
            'purchase_price' => '3.00',
            'selling_price' => '3.50',
            'category_id' => 1,
        ]);

        Medicine::create([
            'name' => 'Codeína',
            'details' => 'Se utiliza para tratar el dolor moderado a severo',
            'purchase_price' => '4.00',
            'selling_price' => '4.50',
            'category_id' => 1,
        ]);

        Medicine::create([
            'name' => 'Amoxicilina',
            'details' => 'Trata infecciones bacterianas',
            'purchase_price' => '4.00',
            'selling_price' => '4.50',
            'category_id' => 2,
        ]);

        Medicine::create([
            'name' => 'Claritromicina ',
            'details' => 'Trata infecciones respiratorias y de la piel',
            'purchase_price' => '3.00',
            'selling_price' => '5.50',
            'category_id' => 2,
        ]);

        Medicine::create([
            'name' => 'Ciprofloxacino',
            'details' => 'Trata infecciones del tracto urinario y otras infecciones bacterianas',
            'purchase_price' => '5.00',
            'selling_price' => '6.50',
            'category_id' => 2,
        ]);

        Medicine::create([
            'name' => 'Fluoxetina',
            'details' => 'Trata la depresión, trastorno obsesivo-compulsivo y bulimia nerviosa',
            'purchase_price' => '3.00',
            'selling_price' => '4.50',
            'category_id' => 3,
        ]);

        Medicine::create([
            'name' => 'Sertralina',
            'details' => 'Trata la depresión, trastorno obsesivo-compulsivo y trastorno de pánico',
            'purchase_price' => '4.00',
            'selling_price' => '5.50',
            'category_id' => 3,
        ]);

        Medicine::create([
            'name' => 'Escitalopram',
            'details' => 'Trata la depresión y trastorno de ansiedad generalizada',
            'purchase_price' => '5.00',
            'selling_price' => '6.50',
            'category_id' => 3,
        ]);

        Medicine::create([
            'name' => 'Difenhidramina',
            'details' => 'Trata alergias, resfriados y problemas para dormir',
            'purchase_price' => '3.00',
            'selling_price' => '4.50',
            'category_id' => 4,
        ]);

        Medicine::create([
            'name' => 'Loratadina',
            'details' => 'Alivia los síntomas de alergias estacionales',
            'purchase_price' => '2.00',
            'selling_price' => '3.50',
            'category_id' => 4,
        ]);

        Medicine::create([
            'name' => 'Cetirizina',
            'details' => 'Alivia los síntomas de alergias estacionales y urticaria',
            'purchase_price' => '4.00',
            'selling_price' => '5.50',
            'category_id' => 4,
        ]);

        Medicine::create([
            'name' => 'Diclofenaco',
            'details' => 'Alivia el dolor y reduce la inflamación',
            'purchase_price' => '3.00',
            'selling_price' => '4.50',
            'category_id' => 5,
        ]);

        Medicine::create([
            'name' => 'Naproxeno',
            'details' => 'Reduce el dolor y la inflamación',
            'purchase_price' => '4.00',
            'selling_price' => '5.50',
            'category_id' => 5,
        ]);

        Medicine::create([
            'name' => 'Meloxicam',
            'details' => 'Alivia el dolor y la inflamación, utilizado en enfermedades como la artritis',
            'purchase_price' => '5.00',
            'selling_price' => '6.50',
            'category_id' => 5,
        ]);

        








        
    }
}
