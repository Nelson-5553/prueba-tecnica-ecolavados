<?php

namespace Tests\Feature;

use App\Models\Employee;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_employees(): void
    {
        Employee::factory()->count(3)->create();

        $response = $this->get(route('employees'));

        $response->assertOk();
    }

    public function test_can_create_employee(): void
    {
        $data = [
            'name' => 'Juan Pérez',
            'email' => 'juan@example.com',
        ];

        $response = $this->post(route('employees.store'), $data);

        $response->assertRedirect(route('employees'));
        $this->assertDatabaseHas('employees', $data);
    }

    public function test_employee_validation_name_required(): void
    {
        $response = $this->post(route('employees.store'), [
            'email' => 'juan@example.com',
        ]);

        $response->assertSessionHasErrors('name');
    }

    public function test_employee_validation_email_required(): void
    {
        $response = $this->post(route('employees.store'), [
            'name' => 'Juan Pérez',
        ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_employee_validation_email_unique(): void
    {
        Employee::factory()->create(['email' => 'juan@example.com']);

        $response = $this->post(route('employees.store'), [
            'name' => 'Otro Juan',
            'email' => 'juan@example.com',
        ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_can_update_employee(): void
    {
        $employee = Employee::factory()->create();

        $response = $this->put(route('employees.update', $employee), [
            'name' => 'Nuevo Nombre',
            'email' => 'nuevo@example.com',
        ]);

        $response->assertRedirect(route('employees'));
        $this->assertDatabaseHas('employees', [
            'id' => $employee->id,
            'name' => 'Nuevo Nombre',
            'email' => 'nuevo@example.com',
        ]);
    }

    public function test_employee_update_email_unique_ignores_self(): void
    {
        $employee = Employee::factory()->create(['email' => 'juan@example.com']);

        $response = $this->put(route('employees.update', $employee), [
            'name' => 'Juan Pérez',
            'email' => 'juan@example.com',
        ]);

        $response->assertRedirect(route('employees'));
    }

    public function test_can_list_employees_with_pagination(): void
    {
        Employee::factory()->count(10)->create();

        $response = $this->get(route('employees', ['page' => 2]));

        $response->assertOk();
    }
}
