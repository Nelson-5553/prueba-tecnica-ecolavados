<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Requests\EmployeeStoreRequest;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function orders()
    {
        return Inertia::render('Orders');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::limit(5)->get();
         return Inertia::render('Employee/Employees', [
            'employees' => $employees,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeStoreRequest $request)
    {
        $employee = Employee::create($request->validated());

        return redirect()->route('employees')->with('success', 'Empleado creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
