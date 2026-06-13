export interface Order {
    id: number;
    client_name: string;
    order_date: string;
    employee_id: number;
    employee: {
        id: number;
        name: string;
        email: string;
    };
    status: 'pendiente' | 'en_ruta' | 'entregado' | 'cancelada';
    observations?: string;
    created_at: string;
    updated_at: string;
}
