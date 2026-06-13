<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

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
            ['name' => 'Bob Brown', 'email' => 'bob.brown@example.com'],
            ['name' => 'Michael Davis', 'email' => 'michael.davis@example.com'],
            ['name' => 'Emily Wilson', 'email' => 'emily.wilson@example.com'],
            ['name' => 'David Martinez', 'email' => 'david.martinez@example.com'],
            ['name' => 'Sarah Anderson', 'email' => 'sarah.anderson@example.com'],
            ['name' => 'James Taylor', 'email' => 'james.taylor@example.com'],
            ['name' => 'Jessica Thomas', 'email' => 'jessica.thomas@example.com'],
            ['name' => 'Daniel Moore', 'email' => 'daniel.moore@example.com'],
            ['name' => 'Laura Jackson', 'email' => 'laura.jackson@example.com'],
            ['name' => 'Matthew White', 'email' => 'matthew.white@example.com'],
            ['name' => 'Olivia Harris', 'email' => 'olivia.harris@example.com'],
            ['name' => 'Christopher Martin', 'email' => 'christopher.martin@example.com'],
            ['name' => 'Sophia Thompson', 'email' => 'sophia.thompson@example.com'],
            ['name' => 'Andrew Garcia', 'email' => 'andrew.garcia@example.com'],
            ['name' => 'Mia Rodriguez', 'email' => 'mia.rodriguez@example.com'],
            ['name' => 'Joshua Lewis', 'email' => 'joshua.lewis@example.com'],
            ['name' => 'Emma Walker', 'email' => 'emma.walker@example.com'],
        ];
        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
