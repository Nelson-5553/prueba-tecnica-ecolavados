<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $employees = [
            ['name' => 'John Doe', 'email' => 'john.doe@example.com'],
            ['name' => 'Jane Smith', 'email' => 'jane.smith@example.com'],
            ['name' => 'Alice Johnson', 'email' => 'alice.johnson@example.com'],
            ['name' => 'Bob Brown', 'email' => 'bob.brown@example.com']
        ];
        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
