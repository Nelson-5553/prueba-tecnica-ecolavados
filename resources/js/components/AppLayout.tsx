import { Head } from '@inertiajs/react';
import { ClipboardList, Users, Droplets } from 'lucide-react';
import type { ReactNode } from 'react';

interface AppLayoutProps {
    title: string;
    children: ReactNode;
    activeNav: 'orders' | 'employees';
}

export default function AppLayout({
    title,
    children,
    activeNav,
}: AppLayoutProps) {
    return (
        <>
            <Head title={title} />

            <div className="flex min-h-screen flex-col bg-background">
                <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
                    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                        <a
                            href="/"
                            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
                        >
                            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Droplets className="size-4" />
                            </span>
                            Ecolavados
                        </a>

                        <nav className="flex items-center gap-1">
                            <a
                                href="/orders"
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                    activeNav === 'orders'
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                }`}
                            >
                                <ClipboardList className="size-4" />
                                Órdenes
                            </a>
                            <a
                                href="/employees"
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                    activeNav === 'employees'
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                }`}
                            >
                                <Users className="size-4" />
                                Empleados
                            </a>
                        </nav>
                    </div>
                </header>

                <main className="flex-1 px-6 py-8">{children}</main>

                <footer className="border-t">
                    <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-6 py-6 text-center text-xs text-muted-foreground">
                        <p className="flex items-center gap-1 font-medium text-foreground/60">
                            <Droplets className="size-3" />
                            Ecolavados
                        </p>
                        <p>Prueba técnica &mdash; Hecho por NELSON</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
