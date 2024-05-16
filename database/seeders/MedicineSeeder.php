<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medicine;
use Illuminate\Support\Str;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $medicines = [
            [
                'name' => 'Paracetamol',
                'details' => 'Alivia el dolor y reduce la fiebre',
                'purchase_price' => '1.50',
                'selling_price' => '2.00',
                'category_id' => 1,
            ],
            [
                'name' => 'Ibuprofeno',
                'details' => 'Alivia el dolor y reduce la fiebre',
                'purchase_price' => '2.00',
                'selling_price' => '2.50',
                'category_id' => 1,
            ],
            [
                'name' => 'Naproxeno',
                'details' => 'Reduce el dolor y la inflamación',
                'purchase_price' => '3.00',
                'selling_price' => '3.50',
                'category_id' => 1,
            ],
            [
                'name' => 'Codeína',
                'details' => 'Se utiliza para tratar el dolor moderado a severo',
                'purchase_price' => '4.00',
                'selling_price' => '4.50',
                'category_id' => 1,
            ],
            [
                'name' => 'Amoxicilina',
                'details' => 'Trata infecciones bacterianas',
                'purchase_price' => '4.00',
                'selling_price' => '4.50',
                'category_id' => 2,
            ],
            [
                'name' => 'Claritromicina',
                'details' => 'Trata infecciones respiratorias y de la piel',
                'purchase_price' => '3.00',
                'selling_price' => '5.50',
                'category_id' => 2,
            ],
            [
                'name' => 'Ciprofloxacino',
                'details' => 'Trata infecciones del tracto urinario y otras infecciones bacterianas',
                'purchase_price' => '5.00',
                'selling_price' => '6.50',
                'category_id' => 2,
            ],
            [
                'name' => 'Fluoxetina',
                'details' => 'Trata la depresión, trastorno obsesivo-compulsivo y bulimia nerviosa',
                'purchase_price' => '3.00',
                'selling_price' => '4.50',
                'category_id' => 3,
            ],
            [
                'name' => 'Sertralina',
                'details' => 'Trata la depresión, trastorno obsesivo-compulsivo y trastorno de pánico',
                'purchase_price' => '4.00',
                'selling_price' => '5.50',
                'category_id' => 3,
            ],
            [
                'name' => 'Escitalopram',
                'details' => 'Trata la depresión y trastorno de ansiedad generalizada',
                'purchase_price' => '5.00',
                'selling_price' => '6.50',
                'category_id' => 3,
            ],
            [
                'name' => 'Difenhidramina',
                'details' => 'Trata alergias, resfriados y problemas para dormir',
                'purchase_price' => '3.00',
                'selling_price' => '4.50',
                'category_id' => 4,
            ],
            [
                'name' => 'Loratadina',
                'details' => 'Alivia los síntomas de alergias estacionales',
                'purchase_price' => '2.00',
                'selling_price' => '3.50',
                'category_id' => 4,
            ],
            [
                'name' => 'Cetirizina',
                'details' => 'Alivia los síntomas de alergias estacionales y urticaria',
                'purchase_price' => '4.00',
                'selling_price' => '5.50',
                'category_id' => 4,
            ],
            [
                'name' => 'Diclofenaco',
                'details' => 'Alivia el dolor y reduce la inflamación',
                'purchase_price' => '3.00',
                'selling_price' => '4.50',
                'category_id' => 5,
            ],
            [
                'name' => 'Naproxeno',
                'details' => 'Reduce el dolor y la inflamación',
                'purchase_price' => '4.00',
                'selling_price' => '5.50',
                'category_id' => 5,
            ],
            [
                'name' => 'Meloxicam',
                'details' => 'Alivia el dolor y la inflamación, utilizado en enfermedades como la artritis',
                'purchase_price' => '5.00',
                'selling_price' => '6.50',
                'category_id' => 5,
            ],
        ];

        foreach ($medicines as $medicine) {
            $medicine['batch_number'] = 'L-' . date('Ymd') . Str::random(5);
            Medicine::create($medicine);
        }
    }
}