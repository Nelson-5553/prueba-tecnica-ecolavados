import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface Option {
    value: string;
    label: string;
}

interface ColumnFilterProps {
    label: string;
    options: Option[];
    activeValue: string | undefined;
    onChange: (value: string | null) => void;
}

export function ColumnFilter({ label, options, activeValue, onChange }: ColumnFilterProps) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node) &&
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        if (open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();

            setMenuStyle({
                position: 'fixed',
                top: `${rect.bottom + 4}px`,
                left: `${rect.left}px`,
                minWidth: `${Math.max(rect.width, 160)}px`,
            });
        }
    }, [open]);

    return (
        <div ref={triggerRef} className="inline-flex items-center gap-1">
            <span>{label}</span>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    'flex size-4 items-center justify-center rounded transition-colors',
                    activeValue
                        ? 'text-foreground bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                )}
            >
                <ChevronDown className="size-3" />
            </button>

            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="z-50 w-48 origin-top-right rounded-lg border bg-popover p-1 shadow-md ring-1 ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95"
                        style={menuStyle}
                    >
                        <div className="max-h-60 overflow-y-auto">
                            <button
                                type="button"
                                className={cn(
                                    'flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                    !activeValue && 'bg-accent font-medium',
                                )}
                                onClick={() => {
                                    onChange(null);
                                    setOpen(false);
                                }}
                            >
                                Todos
                            </button>
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={cn(
                                        'flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                        activeValue === option.value &&
                                            'bg-accent font-medium',
                                    )}
                                    onClick={() => {
                                        onChange(
                                            activeValue === option.value
                                                ? null
                                                : option.value,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
