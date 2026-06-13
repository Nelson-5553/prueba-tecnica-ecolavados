import { Pencil, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { CreateModalEmployee } from '@/components/Employee/CreateModalEmployee';
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
import type { Employee } from '@/types';

export default function Employees({ employees }: { employees: Employee[] }) {
    return (
        <AppLayout title="Empleados" activeNav="employees">
            <div className="mx-auto max-w-4xl">
                <Card>
                    <CardContent>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-medium">Empleados</h2>
                            <CreateModalEmployee />
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">
                                        Acciones
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
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
