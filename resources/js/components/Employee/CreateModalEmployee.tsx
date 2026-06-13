import { Form, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store as storeEmployee } from '@/routes/employees';

export function CreateModalEmployee() {
    const [open, setOpen] = useState(false);
    const errors = usePage().props.errors as Record<string, string>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="size-4" />
                    Crear Empleados
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <Form
                    method="post"
                    action={storeEmployee().url}
                    onSuccess={() => setOpen(false)}
                >
                    <DialogHeader>
                        <DialogTitle>Crear Empleado</DialogTitle>
                        <DialogDescription>
                            Complete los campos para crear un nuevo empleado.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input
                                id="name-1"
                                name="name"
                                defaultValue="Pedro Duarte"
                            />
                            <FieldError
                                errors={
                                    errors.name
                                        ? [{ message: errors.name }]
                                        : undefined
                                }
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">Email</Label>
                            <Input
                                id="email-1"
                                name="email"
                                type="email"
                                defaultValue="pedro@duarte.com"
                            />
                            <FieldError
                                errors={
                                    errors.email
                                        ? [{ message: errors.email }]
                                        : undefined
                                }
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
