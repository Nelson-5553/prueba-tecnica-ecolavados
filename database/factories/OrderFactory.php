<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'client_name' => fake()->company(),
            'order_date' => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'employee_id' => Employee::factory(),
            'status' => fake()->randomElement(['pendiente', 'en_ruta', 'entregado', 'cancelada']),
            'observations' => fake()->optional(0.7)->sentence(),
        ];
    }

    public function pendiente(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pendiente',
        ]);
    }

    public function enRuta(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'en_ruta',
        ]);
    }

    public function entregado(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'entregado',
        ]);
    }

    public function cancelada(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelada',
        ]);
    }
}
