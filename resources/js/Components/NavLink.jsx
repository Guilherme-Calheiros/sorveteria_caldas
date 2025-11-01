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
            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors text-gray-800
                ${active ? ' border border-primary-light bg-primary-light/20 hover:bg-primary-light/70 transition-all duration-300' : ' hover:bg-gray-100'}
            `}
        >
            {children}
        </Link>
    );
}
