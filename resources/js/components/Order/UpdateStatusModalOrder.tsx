import { Form } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
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
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { change_status as patchOrder } from '@/routes/orders';
import type { Order } from '@/types';

const STATUS_OPTIONS = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_ruta', label: 'En ruta' },
    { value: 'entregado', label: 'Entregado' },
    { value: 'cancelada', label: 'Cancelada' },
];

interface UpdateStatusModalOrderProps {
    order: Order;
}

export function UpdateStatusModalOrder({ order }: UpdateStatusModalOrderProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-xs"
                    title="Actualizar estado"
                >
                    <RefreshCw className="size-3" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xs">
                <Form
                    method="patch"
                    action={patchOrder(order.id).url}
                    onSuccess={() => setOpen(false)}
                >
                    <DialogHeader>
                        <DialogTitle>Actualizar Estado</DialogTitle>
                        <DialogDescription>
                            Seleccione el nuevo estado de la orden.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Field>
                            <Label>Estado</Label>
                            <Select
                                name="status"
                                defaultValue={order.status || ''}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Estados</SelectLabel>
                                        {STATUS_OPTIONS.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
