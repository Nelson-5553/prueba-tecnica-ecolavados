<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Orders')->name('home');

Route::get('/orders', [EmployeeController::class, 'orders'])->name('orders');
Route::get('/employees', [EmployeeController::class, 'employees'])->name('employees');
