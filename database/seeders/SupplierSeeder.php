<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::create([
            'name' => 'Laboratorios Ubiopharma',
            'address' => 'avenida juan de austria 142, Guadalajara',
            'phone' => '949 21 39 53',
            'email' => 'ubiopharma@gmail.com',
            'logo' => 'https://i.imgur.com/emc5Nk0.png',
        ]);

        Supplier::create([
            'name' => 'Laboratorios Roche',
            'address' => 'Avinguda de la Generalitat, 171, 173, 08174',
            'phone' => '935 83 40 00',
            'email' => 'roche@gmail.com',
            'logo' => 'https://i.imgur.com/U5zGllC.png',
        ]);

        Supplier::create([
            'name' => 'Laboratorios Pfizer',
            'address' => 'Pl. dEuropa, 9, 11, 08908 Hospitalet de Llobregat',
            'phone' => '932 42 46 21',
            'email' => 'pfizer@gmail.com',
            'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pfizer_%282021%29.svg/320px-Pfizer_%282021%29.svg.png',
        ]);

        Supplier::create([
            'name' => 'Laboratorios Bayer',
            'address' => 'Av. Baix Llobregat, 3, 5, 08970 Sant Joan Despí',
            'phone' => '932 28 40 00',
            'email' => 'bayer@gmail.com',
            'logo' => 'https://www.plantadoce.com/files//2020/empresas/bayer/bayer-instalacion-728.jpg',
        ]);

        Supplier::create([
            'name' => 'Laboratorios Novartis',
            'address' => ' Gran Via de les Corts Catalanes, 764',
            'phone' => '933 06 42 00',
            'email' => 'novartis@gmail.com',
            'logo' => 'https://www.novartis.com/es-es/sites/novartis_com/files/novartis-logo-open-graph.jpg',
        ]);
    }
}
