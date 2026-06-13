import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { sileo } from 'sileo';

export function FlashMessages() {
    const { flash } = usePage<{
        flash: {
            success?: string;
            error?: string;
        };
    }>().props;

    useEffect(() => {
        if (flash?.success) {
            sileo.success({
                title: "Success",
                description: flash.success
            });
        }

        if (flash?.error) {
            sileo.error({
                title: "Error",
                description: flash.error
            });
        }
    }, [flash]);

    return null;
}