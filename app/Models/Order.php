<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
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
