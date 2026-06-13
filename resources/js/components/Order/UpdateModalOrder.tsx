import { Form } from '@inertiajs/react';
import { Pencil, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
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
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import { update as updateOrder } from '@/routes/orders';
import type { Employee, Order } from '@/types';

const STATUS_OPTIONS = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_ruta', label: 'En ruta' },
    { value: 'entregado', label: 'Entregado' },
    { value: 'cancelada', label: 'Cancelada' },
];

interface UpdateModalOrderProps {
    employees: Employee[];
    order: Order;
}

export function UpdateModalOrder({ employees, order }: UpdateModalOrderProps) {
    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState('');

    const filteredEmployees = useMemo(
        () =>
            employees.filter((employee) =>
                employee.name.toLowerCase().includes(search.toLowerCase()),
            ),

        [employees, search],
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-xs" title="Actualizar">
                    <Pencil className="size-3" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <Form
                    method="put"
                    action={updateOrder(order.id).url}
                    onSuccess={() => setOpen(false)}
                >
                    <DialogHeader>
                        <DialogTitle>Actualizar Orden</DialogTitle>
                        <DialogDescription>
                            Complete los campos para actualizar la orden.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <Field>
                            <Label htmlFor="client_name">
                                Nombre del cliente
                            </Label>

                            <Input
                                id="client_name"
                                name="client_name"
                                defaultValue={order.client_name}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="order_date">
                                Fecha de la orden
                            </Label>

                            <Input
                                id="order_date"
                                name="order_date"
                                type="date"
                                defaultValue={order.order_date}
                                required
                            />
                        </Field>

                        <Field className="col-span-2">
                            <Label>Conductor asignado</Label>
                            <Select
                                name="employee_id"
                                defaultValue={String(order.employee_id)}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar conductor" />
                                </SelectTrigger>

                                <SelectContent>
                                    <div
                                        className="flex items-center gap-1.5 px-2 py-1.5"
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                    >
                                        <Search className="size-4 shrink-0 text-muted-foreground" />
                                        <Input
                                            placeholder="Buscar conductor..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="h-7 border-0 shadow-none focus-visible:ring-0"
                                        />
                                    </div>

                                    <SelectGroup>
                                        <SelectLabel>Conductores</SelectLabel>
                                        {filteredEmployees.length > 0 ? (
                                            filteredEmployees.map(
                                                (employee) => (
                                                    <SelectItem
                                                        key={employee.id}
                                                        value={String(
                                                            employee.id,
                                                        )}
                                                    >
                                                        {employee.name}
                                                    </SelectItem>
                                                ),
                                            )
                                        ) : (
                                            <div className="px-1.5 py-4 text-center text-xs text-muted-foreground">
                                                Sin resultados
                                            </div>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field className="col-span-2">
                            <Label htmlFor="observations">Observaciones</Label>

                            <Textarea
                                id="observations"
                                name="observations"
                                placeholder="Notas adicionales sobre la orden..."
                                rows={3}
                                defaultValue={order.observations || ''}
                            />
                        </Field>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Actualizar orden</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
