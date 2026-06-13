import { Form, usePage } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
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
import { Field, FieldError } from '@/components/ui/field';
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
import { store as storeOrder } from '@/routes/orders';
import type { Employee } from '@/types';

interface CreateModalOrderProps {
    employees: Employee[];
}

export function CreateModalOrder({ employees }: CreateModalOrderProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const errors = usePage().props.errors as Record<string, string>;

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
                <Button size="sm">
                    <Plus className="size-4" />
                    Crear Orden
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <Form
                    method="post"
                    action={storeOrder().url}
                    onSuccess={() => setOpen(false)}
                >
                        {({ errors, processing }) => (
                            <>
                    <DialogHeader>
                        <DialogTitle>Crear Orden</DialogTitle>
                        <DialogDescription>
                            Complete los campos para registrar una nueva orden.
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
                                placeholder="Ej. Juan García"
                                required
                            />
                            <FieldError
                                errors={
                                    errors.client_name
                                        ? [{ message: errors.client_name }]
                                        : undefined
                                }
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
                                defaultValue={
                                    new Date().toISOString().split('T')[0]
                                }
                                required
                            />
                            <FieldError
                                errors={
                                    errors.order_date
                                        ? [{ message: errors.order_date }]
                                        : undefined
                                }
                            />
                        </Field>

                        <Field className="col-span-2">
                            <Label>Conductor asignado</Label>
                            <Select name="employee_id" required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar conductor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div
                                        className="col-span-2 flex items-center gap-1.5 px-2 py-1.5"
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
                            <FieldError
                                errors={
                                    errors.employee_id
                                        ? [{ message: errors.employee_id }]
                                        : undefined
                                }
                            />
                        </Field>

                        <Field className="col-span-2">
                            <Label htmlFor="observations">Observaciones</Label>
                            <Textarea
                                id="observations"
                                name="observations"
                                placeholder="Notas adicionales sobre la orden..."
                                rows={3}
                            />
                            <FieldError
                                errors={
                                    errors.observations
                                        ? [{ message: errors.observations }]
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
                                Guardando...
                            </Button>
                        ) : (
                            <Button type="submit">Guardar orden</Button>
                        )}
                    </DialogFooter>
                    </>
                        )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
