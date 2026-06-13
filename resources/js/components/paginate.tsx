import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaginatedData } from '@/types';

export default function Paginate<T>({ data }: { data: PaginatedData<T> }) {
    return (
        <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
                {data.links
                    .filter(
                        (link) => link.url && !Number.isNaN(Number(link.label)),
                    )
                    .map((link) => (
                        <Button
                            key={link.label}
                            variant={link.active ? 'default' : 'ghost'}
                            size="icon-xs"
                            onClick={() => {
                                if (link.url) {
                                    router.visit(link.url);
                                }
                            }}
                        >
                            {link.label}
                        </Button>
                    ))}
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (data.prev_page_url) {
                            router.visit(data.prev_page_url);
                        }
                    }}
                    disabled={!data.prev_page_url}
                >
                    <ChevronLeft className="size-4" />
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (data.next_page_url) {
                            router.visit(data.next_page_url);
                        }
                    }}
                    disabled={!data.next_page_url}
                >
                    Siguiente
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}
