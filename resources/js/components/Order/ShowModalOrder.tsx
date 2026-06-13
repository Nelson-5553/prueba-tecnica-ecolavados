import { Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Order } from '@/types';

const statusLabels: Record<string, string> = {
    pendiente: 'Pendiente',
    en_ruta: 'En ruta',
    entregado: 'Entregado',
    cancelada: 'Cancelada',
};

interface ShowModalOrderProps {
    order: Order;
}

export function ShowModalOrder({ order }: ShowModalOrderProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-xs" title="Ver detalle">
                    <Eye className="size-3" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Orden #{order.id}</DialogTitle>
                    <DialogDescription>
                        Detalles completos de la orden
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Cliente
                        </Label>
                        <p className="text-sm font-medium">
                            {order.client_name}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Fecha
                        </Label>
                        <p className="text-sm font-medium">
                            {order.order_date}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Conductor
                        </Label>
                        <p className="text-sm font-medium">
                            {order.employee.name}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Email del conductor
                        </Label>
                        <p className="text-sm font-medium">
                            {order.employee.email}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Estado
                        </Label>
                        <p className="text-sm font-medium">
                            {statusLabels[order.status] ?? order.status}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Creada
                        </Label>
                        <p className="text-sm font-medium">
                            {new Date(order.created_at).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            Observaciones
                        </Label>
                        <p className="text-sm font-medium">
                            {order.observations || 'Sin observaciones'}
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
