import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors
                ${active ? 'bg-secondary-light text-foreground font-semibold hover:bg-secondary/50' : 'text-gray-700 hover:bg-gray-100'}
            `}
        >
            {children}
        </Link>
    );
}
