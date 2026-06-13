<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Employee;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $employees = Employee::select('id', 'name')->get();

        $query = Order::with('employee:id,name,email')->orderBy('updated_at', 'desc');

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->paginate(5);

        return Inertia::render('Orders', [
            'orders' => $orders,
            'employees' => $employees,
            'filters' => $request->only(['employee_id', 'status']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        Order::create($request->validated());

        return redirect()->route('orders')->with('success', 'Orden creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function change_status(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', function (string $attribute, mixed $value, \Closure $fail) use ($order) {
                $allowed = match ($order->status) {
                    'pendiente' => ['en_ruta', 'cancelada'],
                    'en_ruta' => ['entregado', 'cancelada'],
                    'entregado' => ['cancelada'],
                    'cancelada' => ['pendiente', 'en_ruta', 'entregado'],
                    default => [],
                };

                if (! in_array($value, $allowed, true)) {
                    $fail("No se puede cambiar de {$order->status} a {$value}.");
                }
            }],
        ]);

        $order->update($validated);

        return redirect()->route('orders')->with('success', 'Estado de la orden actualizado exitosamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $order->update($request->validated());

        return redirect()->route('orders')->with('success', 'Orden actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
