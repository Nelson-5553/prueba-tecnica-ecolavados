import { Form } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update as updateEmployee } from '@/routes/employees';
import type { Employee } from '@/types';

interface UpdateModalEmployeeProps {
    employee: Employee;
}

export function UpdateModalEmployee({ employee }: UpdateModalEmployeeProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-xs" title="Actualizar">
                    <Pencil className="size-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <Form
                    method="put"
                    action={updateEmployee(employee.id).url}
                    onSuccess={() => setOpen(false)}
                >
                    <DialogHeader>
                        <DialogTitle>Actualizar Empleado</DialogTitle>
                        <DialogDescription>
                            Complete los campos para actualizar el empleado.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Nombre</Label>
                            <Input
                                id="name-1"
                                name="name"
                                defaultValue={employee.name}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">Email</Label>
                            <Input
                                id="email-1"
                                name="email"
                                type="email"
                                defaultValue={employee.email}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Actualizar</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
