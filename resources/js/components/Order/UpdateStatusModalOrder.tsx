import { Form, usePage } from '@inertiajs/react';
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
import { Field, FieldError } from '@/components/ui/field';
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

const getAvailableStatuses = (currentStatus: string) => {
    switch (currentStatus) {
        case 'pendiente':
            return STATUS_OPTIONS.filter(
                (option) =>
                    option.value === 'en_ruta' || option.value === 'cancelada',
            );

        case 'en_ruta':
            return STATUS_OPTIONS.filter(
                (option) =>
                    option.value === 'entregado' ||
                    option.value === 'cancelada',
            );

        case 'entregado':
            return STATUS_OPTIONS.filter(
                (option) => option.value === 'cancelada',
            );

        case 'cancelada':
            return STATUS_OPTIONS.filter(
                (option) => option.value !== 'cancelada',
            );

        default:
            return [];
    }
};

interface UpdateStatusModalOrderProps {
    order: Order;
}

export function UpdateStatusModalOrder({ order }: UpdateStatusModalOrderProps) {
    const [open, setOpen] = useState(false);
    const errors = usePage().props.errors as Record<string, string>;

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
                    {({ processing }) => (
                        <>
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
                                        {getAvailableStatuses(order.status).map(
                                            (option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError
                                errors={
                                    errors.status
                                        ? [{ message: errors.status }]
                                        : undefined
                                }
                            />
                        </Field>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        {processing ? (
                            <Button disabled>
                                <span className="loading loading-spinner" />
                                Actualizando...
                            </Button>
                        ) : (
                            <Button type="submit">Guardar</Button>
                        )}
                    </DialogFooter>
                    </>
                        )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
