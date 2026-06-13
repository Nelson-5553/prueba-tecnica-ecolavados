<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $employees = [
            ['name' => 'John Doe', 'email' => 'john.doe@example.com'],
            ['name' => 'Jane Smith', 'email' => 'jane.smith@example.com'],
            ['name' => 'Alice Johnson', 'email' => 'alice.johnson@example.com'],
            ['name' => 'Bob Brown', 'email' => 'bob.brown@example.com'],
            ['name' => 'Michael Davis', 'email' => 'michael.davis@example.com'],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
