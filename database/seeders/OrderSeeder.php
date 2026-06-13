<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    private const ACTIVE_STATUSES = ['pendiente', 'en_ruta'];

    public function run(): void
    {
        $employees = Employee::limit(5)->get();
        $activeEmployees = [];

        $orders = [
            // Employee 1 — John Doe: starts with a pendiente, then blocked for active
            ['client_name' => 'Juan Pérez', 'order_date' => '2026-01-10', 'employee_id' => 1, 'status' => 'pendiente', 'observations' => 'Entrega urgente'],
            ['client_name' => 'Pedro López', 'order_date' => '2026-01-12', 'employee_id' => 1, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Lucía Ramírez', 'order_date' => '2026-01-15', 'employee_id' => 1, 'status' => 'cancelada', 'observations' => 'Cliente canceló'],
            ['client_name' => 'Diego Torres', 'order_date' => '2026-02-01', 'employee_id' => 1, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Valeria Castillo', 'order_date' => '2026-03-05', 'employee_id' => 1, 'status' => 'entregado', 'observations' => 'Cliente satisfecho'],

            // Employee 2 — Jane Smith: starts with en_ruta, then blocked for active
            ['client_name' => 'María Gómez', 'order_date' => '2026-01-11', 'employee_id' => 2, 'status' => 'en_ruta', 'observations' => null],
            ['client_name' => 'Carlos Ruiz', 'order_date' => '2026-01-14', 'employee_id' => 2, 'status' => 'entregado', 'observations' => 'Todo en orden'],
            ['client_name' => 'Sofía Herrera', 'order_date' => '2026-02-10', 'employee_id' => 2, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Jorge Vargas', 'order_date' => '2026-03-01', 'employee_id' => 2, 'status' => 'cancelada', 'observations' => 'Cambio de proveedor'],

            // Employee 3 — Alice Johnson: all completed/cancelled, can take any
            ['client_name' => 'Ana Martínez', 'order_date' => '2026-01-08', 'employee_id' => 3, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Luis Fernández', 'order_date' => '2026-01-20', 'employee_id' => 3, 'status' => 'entregado', 'observations' => 'Cliente feliz'],
            ['client_name' => 'Elena Ríos', 'order_date' => '2026-02-15', 'employee_id' => 3, 'status' => 'cancelada', 'observations' => 'Cancelación solicitada'],
            ['client_name' => 'Pablo Méndez', 'order_date' => '2026-03-10', 'employee_id' => 3, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Camila Ortega', 'order_date' => '2026-04-01', 'employee_id' => 3, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Andrés Vega', 'order_date' => '2026-04-20', 'employee_id' => 3, 'status' => 'entregado', 'observations' => null],

            // Employee 4 — Bob Brown: all completed, can take any
            ['client_name' => 'Rosa Medina', 'order_date' => '2026-01-05', 'employee_id' => 4, 'status' => 'entregado', 'observations' => 'Entregado a tiempo'],
            ['client_name' => 'Hugo Campos', 'order_date' => '2026-02-05', 'employee_id' => 4, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Irene Peña', 'order_date' => '2026-02-28', 'employee_id' => 4, 'status' => 'cancelada', 'observations' => 'Cliente no contactó'],
            ['client_name' => 'Tomás Guerrero', 'order_date' => '2026-03-15', 'employee_id' => 4, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Natalia Flores', 'order_date' => '2026-04-10', 'employee_id' => 4, 'status' => 'entregado', 'observations' => null],

            // Employee 5 — Michael Davis: all completed/cancelled, can take any
            ['client_name' => 'Fernando Cruz', 'order_date' => '2026-01-18', 'employee_id' => 5, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Lorena Silva', 'order_date' => '2026-02-12', 'employee_id' => 5, 'status' => 'entregado', 'observations' => 'Sin novedades'],
            ['client_name' => 'Ricardo Navarro', 'order_date' => '2026-03-08', 'employee_id' => 5, 'status' => 'cancelada', 'observations' => 'Canceló por lluvia'],
            ['client_name' => 'Patricia Delgado', 'order_date' => '2026-03-22', 'employee_id' => 5, 'status' => 'entregado', 'observations' => null],
            ['client_name' => 'Alberto Reyes', 'order_date' => '2026-04-15', 'employee_id' => 5, 'status' => 'entregado', 'observations' => 'Cliente satisfecho'],
        ];

        foreach ($orders as $orderData) {
            $status = $orderData['status'];

            if (in_array($orderData['employee_id'], $activeEmployees, true) && in_array($status, self::ACTIVE_STATUSES, true)) {
                $status = 'entregado';
            }

            if (in_array($status, self::ACTIVE_STATUSES, true)) {
                $activeEmployees[] = $orderData['employee_id'];
            }

            Order::create([
                'client_name' => $orderData['client_name'],
                'order_date' => $orderData['order_date'],
                'employee_id' => $orderData['employee_id'],
                'status' => $status,
                'observations' => $orderData['observations'] ?? null,
            ]);
        }
    }
}
