import { Plus, Pencil, RefreshCw } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import Paginate from '@/components/paginate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Order, PaginatedData } from '@/types';

const estadoVariant: Record<
    string,
    'default' | 'outline' | 'secondary' | 'destructive'
> = {
    pendiente: 'outline',
    en_ruta: 'default',
    completada: 'secondary',
    cancelada: 'destructive',
};

export default function Orders({ orders }: { orders: PaginatedData<Order> }) {
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
                            <Button size="sm">
                                <Plus className="size-4" />
                                Crear orden
                            </Button>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Responsable</TableHead>
                                    <TableHead>Estado</TableHead>
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
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-xs"
                                                    title="Cambiar estado"
                                                >
                                                    <RefreshCw className="size-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-xs"
                                                    title="Actualizar"
                                                >
                                                    <Pencil className="size-3" />
                                                </Button>
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
