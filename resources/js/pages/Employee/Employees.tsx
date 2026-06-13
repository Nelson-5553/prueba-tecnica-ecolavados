import AppLayout from '@/components/AppLayout';
import { CreateModalEmployee } from '@/components/Employee/CreateModalEmployee';
import { UpdateModalEmployee } from '@/components/Employee/UpdateModalEmployee';
import Paginate from '@/components/paginate';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Employee, PaginatedData } from '@/types';

export default function Employees({
    employees,
}: {
    employees: PaginatedData<Employee>;
}) {
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
                                {employees.data.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <UpdateModalEmployee
                                                    employee={employee}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Paginate data={employees} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
