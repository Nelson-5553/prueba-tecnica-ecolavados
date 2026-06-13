<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => 'required|string|max:255',
            'order_date' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'status' => [
                'required',
                Rule::in(['pendiente', 'en_ruta', 'entregado', 'cancelada']),
            ],
            'observations' => 'nullable|string',
        ];
    }
}
