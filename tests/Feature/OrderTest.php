<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_orders(): void
    {
        Order::factory()->count(3)->create();

        $response = $this->get(route('orders'));

        $response->assertOk();
    }

    public function test_can_create_order(): void
    {
        $employee = Employee::factory()->create();

        $response = $this->post(route('orders.store'), [
            'client_name' => 'Cliente SA',
            'order_date' => '2026-06-13',
            'employee_id' => $employee->id,
            'status' => 'pendiente',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'client_name' => 'Cliente SA',
            'employee_id' => $employee->id,
            'status' => 'pendiente',
        ]);
    }

    public function test_order_validation_client_name_required(): void
    {
        $employee = Employee::factory()->create();

        $response = $this->post(route('orders.store'), [
            'order_date' => '2026-06-13',
            'employee_id' => $employee->id,
        ]);

        $response->assertSessionHasErrors('client_name');
    }

    public function test_order_validation_employee_id_exists(): void
    {
        $response = $this->post(route('orders.store'), [
            'client_name' => 'Cliente SA',
            'order_date' => '2026-06-13',
            'employee_id' => 999,
        ]);

        $response->assertSessionHasErrors('employee_id');
    }

    public function test_order_validation_status_invalid(): void
    {
        $employee = Employee::factory()->create();

        $response = $this->post(route('orders.store'), [
            'client_name' => 'Cliente SA',
            'order_date' => '2026-06-13',
            'employee_id' => $employee->id,
            'status' => 'estado_invalido',
        ]);

        $response->assertSessionHasErrors('status');
    }

    public function test_can_update_order(): void
    {
        $order = Order::factory()->pendiente()->create();
        $newEmployee = Employee::factory()->create();

        $response = $this->put(route('orders.update', $order), [
            'client_name' => 'Cliente Actualizado',
            'order_date' => '2026-06-14',
            'employee_id' => $newEmployee->id,
            'status' => 'pendiente',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'client_name' => 'Cliente Actualizado',
            'employee_id' => $newEmployee->id,
        ]);
    }

    public function test_can_change_status_from_pendiente_to_en_ruta(): void
    {
        $order = Order::factory()->pendiente()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'en_ruta',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'en_ruta',
        ]);
    }

    public function test_can_change_status_from_pendiente_to_cancelada(): void
    {
        $order = Order::factory()->pendiente()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'cancelada',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'cancelada',
        ]);
    }

    public function test_cannot_change_status_from_pendiente_to_entregado(): void
    {
        $order = Order::factory()->pendiente()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'entregado',
        ]);

        $response->assertSessionHasErrors('status');
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pendiente',
        ]);
    }

    public function test_can_change_status_from_en_ruta_to_entregado(): void
    {
        $order = Order::factory()->enRuta()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'entregado',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'entregado',
        ]);
    }

    public function test_can_change_status_from_en_ruta_to_cancelada(): void
    {
        $order = Order::factory()->enRuta()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'cancelada',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'cancelada',
        ]);
    }

    public function test_cannot_change_status_from_en_ruta_to_pendiente(): void
    {
        $order = Order::factory()->enRuta()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'pendiente',
        ]);

        $response->assertSessionHasErrors('status');
    }

    public function test_can_change_status_from_entregado_to_cancelada(): void
    {
        $order = Order::factory()->entregado()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'cancelada',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'cancelada',
        ]);
    }

    public function test_cannot_change_status_from_entregado_to_pendiente(): void
    {
        $order = Order::factory()->entregado()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'pendiente',
        ]);

        $response->assertSessionHasErrors('status');
    }

    public function test_can_change_status_from_cancelada_to_pendiente(): void
    {
        $order = Order::factory()->cancelada()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'pendiente',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pendiente',
        ]);
    }

    public function test_can_change_status_from_cancelada_to_en_ruta(): void
    {
        $order = Order::factory()->cancelada()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'en_ruta',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'en_ruta',
        ]);
    }

    public function test_can_change_status_from_cancelada_to_entregado(): void
    {
        $order = Order::factory()->cancelada()->create();

        $response = $this->patch(route('orders.change_status', $order), [
            'status' => 'entregado',
        ]);

        $response->assertRedirect(route('orders'));
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'entregado',
        ]);
    }

    public function test_can_filter_orders_by_status(): void
    {
        Order::factory()->pendiente()->count(2)->create();
        Order::factory()->entregado()->count(3)->create();

        $response = $this->get(route('orders', ['status' => 'entregado']));

        $response->assertOk();
    }

    public function test_can_filter_orders_by_employee(): void
    {
        $employee = Employee::factory()->create();
        Order::factory()->count(2)->create(['employee_id' => $employee->id]);
        Order::factory()->count(3)->create();

        $response = $this->get(route('orders', ['employee_id' => $employee->id]));

        $response->assertOk();
    }

    public function test_filters_persist_across_pagination(): void
    {
        $employee = Employee::factory()->create();
        Order::factory()->count(10)->create(['employee_id' => $employee->id]);

        $response = $this->get(route('orders', ['employee_id' => $employee->id, 'page' => 2]));

        $response->assertOk();
    }

    public function test_can_list_orders_with_pagination(): void
    {
        Order::factory()->count(10)->create();

        $response = $this->get(route('orders', ['page' => 2]));

        $response->assertOk();
    }
}
