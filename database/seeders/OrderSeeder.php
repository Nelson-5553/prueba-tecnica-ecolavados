<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::create([
            'client_name' => 'Juan Pérez',
            'order_date' => '2024-06-15',
            'employee_id' => 1,
            'status' => 'pendiente',
            'observations' => 'Entrega urgente',
        ]);
        Order::create([
            'client_name' => 'María Gómez',
            'order_date' => '2024-06-16',
            'employee_id' => 2,
            'status' => 'en_ruta',
            'observations' => null,
        ]);
        Order::create([
            'client_name' => 'Carlos Rodríguez',
            'order_date' => '2024-06-17',
            'employee_id' => 1,
            'status' => 'completada',
            'observations' => 'Cliente satisfecho',
        ]);
        Order::create([
            'client_name' => 'Ana Martínez',
            'order_date' => '2024-06-18',
            'employee_id' => 3,
            'status' => 'cancelada',
            'observations' => 'Cliente canceló por cambio de planes',
        ]);
        Order::create([
            'client_name' => 'Luis Fernández',
            'order_date' => '2024-06-19',
            'employee_id' => 2,
            'status' => 'pendiente',
            'observations' => 'Requiere atención especial',
        ]);
    }
}
