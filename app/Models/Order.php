<?php

namespace App\Models;

use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'client_name',
        'order_date',
        'employee_id',
        'status',
        'observations',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
