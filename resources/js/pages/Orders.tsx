import {
    Plus,
    Pencil,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
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

const orders = [
    {
        id: 1,
        cliente: 'Juan Pérez',
        fecha: '2026-01-15',
        responsable: 'María López',
        estado: 'Pendiente',
    },
    {
        id: 2,
        cliente: 'Ana García',
        fecha: '2026-02-10',
        responsable: 'Carlos Ruiz',
        estado: 'En Proceso',
    },
    {
        id: 3,
        cliente: 'Pedro Martínez',
        fecha: '2026-03-05',
        responsable: 'Laura Díaz',
        estado: 'Completada',
    },
    {
        id: 4,
        cliente: 'Laura Sánchez',
        fecha: '2026-04-20',
        responsable: 'Roberto Fernández',
        estado: 'Cancelada',
    },
    {
        id: 5,
        cliente: 'Carlos Ramírez',
        fecha: '2026-05-12',
        responsable: 'Sofía Torres',
        estado: 'Pendiente',
    },
];

const estadoVariant: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    Pendiente: 'secondary',
    'En Proceso': 'default',
    Completada: 'outline',
    Cancelada: 'destructive',
};

export default function Orders() {
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
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.cliente}</TableCell>
                                        <TableCell>{order.fecha}</TableCell>
                                        <TableCell>
                                            {order.responsable}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    estadoVariant[
                                                        order.estado
                                                    ] ?? 'default'
                                                }
                                            >
                                                {order.estado}
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

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((page) => (
                                    <Button
                                        key={page}
                                        variant={
                                            page === 1 ? 'default' : 'ghost'
                                        }
                                        size="icon-xs"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <ChevronLeft className="size-4" />
                                    Anterior
                                </Button>
                                <Button variant="outline" size="sm">
                                    Siguiente
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
