import { RefreshCw } from 'lucide-react';
import { router } from '@inertiajs/react';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import Paginate from '@/components/paginate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ColumnFilter } from '@/components/ui/column-filter';
import { CreateModalOrder } from '@/components/Order/CreateModalOrder';
import { ShowModalOrder } from '@/components/Order/ShowModalOrder';
import { UpdateModalOrder } from '@/components/Order/UpdateModalOrder';
import { UpdateStatusModalOrder } from '@/components/Order/UpdateStatusModalOrder';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Employee, Order, PaginatedData } from '@/types';

const STATUS_OPTIONS = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_ruta', label: 'En ruta' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' },
];

const estadoVariant: Record<
    string,
    'default' | 'outline' | 'secondary' | 'destructive'
> = {
    pendiente: 'outline',
    en_ruta: 'default',
    completada: 'secondary',
    cancelada: 'destructive',
};

function applyFilter(key: string, value: string | null) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
        params.set(key, value);
    } else {
        params.delete(key);
    }

    params.set('page', '1');

    const qs = params.toString();

    router.visit(
        qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
}

export default function Orders({
    orders,
    employees,
    filters = {},
}: {
    orders: PaginatedData<Order>;
    employees: Employee[];
    filters?: { employee_id?: string; status?: string };
}) {
    return (
        <AppLayout title="Órdenes" activeNav="orders">
            <div className="mx-auto max-w-4xl">
                <p className="mb-6 text-sm text-muted-foreground">
                    Bienvenido al sistema de gestión de órdenes
                </p>

                <Card>
                    <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-medium">Órdenes</h2>
                            <CreateModalOrder employees={employees} />
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>
                                        <ColumnFilter
                                            label="Conductor"
                                            options={employees.map((e) => ({
                                                value: String(e.id),
                                                label: e.name,
                                            }))}
                                            activeValue={filters.employee_id}
                                            onChange={(v) =>
                                                applyFilter('employee_id', v)
                                            }
                                        />
                                    </TableHead>
                                    <TableHead>
                                        <ColumnFilter
                                            label="Estado"
                                            options={STATUS_OPTIONS}
                                            activeValue={filters.status}
                                            onChange={(v) =>
                                                applyFilter('status', v)
                                            }
                                        />
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Acciones
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.data.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>
                                            {order.client_name}
                                        </TableCell>
                                        <TableCell>
                                            {order.order_date}
                                        </TableCell>
                                        <TableCell>
                                            {order.employee.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    estadoVariant[
                                                        order.status
                                                    ] ?? 'default'
                                                }
                                            >
                                                {order.status === 'pendiente' &&
                                                    'Pendiente'}
                                                {order.status === 'en_ruta' &&
                                                    'En ruta'}
                                                {order.status ===
                                                    'completada' &&
                                                    'Completada'}
                                                {order.status === 'cancelada' &&
                                                    'Cancelada'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <ShowModalOrder order={order} />
                                                <UpdateStatusModalOrder
                                                    order={order}
                                                />
                                                <UpdateModalOrder
                                                    employees={employees}
                                                    order={order}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Paginate data={orders} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
