import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { 
    LuReceiptText, LuIceCreamCone, LuHouse, LuPackage, 
    LuUsers, LuBriefcaseBusiness, LuLogOut, LuMenu, LuX 
} from "react-icons/lu";
import NavLink from '@/Components/NavLink';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function AuthenticatedLayout({ children }) {
    const { temPermissao } = usePage().props.auth;
    const [menuAberto, setMenuAberto] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const toggleMenu = () => setMenuAberto(!menuAberto);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex min-h-screen">
                <aside className="hidden sm:flex w-52 fixed top-0 left-0 bg-white py-4 px-4 space-y-2 flex-col justify-between h-screen shadow-md">
                    <div>
                        <ApplicationLogo className="w-36 mx-auto mb-10" />

                        {!temPermissao ? (
                            <NavLink href={route('pedidos.index')} active={route().current('pedidos.index')}>
                                <LuReceiptText className="w-5 h-5" /> Pedidos
                            </NavLink>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <LuHouse className='w-5 h-5' /> Dashboard
                                </NavLink>
                                <NavLink href={route('pedidos.index')} active={route().current('pedidos.index')}>
                                    <LuReceiptText className="w-5 h-5" /> Pedidos
                                </NavLink>
                                <NavLink href={route('sabores.index')} active={route().current('sabores.index')}>
                                    <LuIceCreamCone className='w-5 h-5' /> Sabores
                                </NavLink>
                                <NavLink href={route('embalagens.index')} active={route().current('embalagens.index')}>
                                    <LuPackage className='w-5 h-5' /> Embalagens
                                </NavLink>
                                <NavLink href={route('funcionarios.index')} active={route().current('funcionarios.index')}>
                                    <LuUsers className='w-5 h-5' /> Funcionários
                                </NavLink>
                                <NavLink href={route('cargos.index')} active={route().current('cargos.index')}>
                                    <LuBriefcaseBusiness className='w-5 h-5' /> Cargos
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <Button variant="ghost" onClick={handleLogout}>
                        <LuLogOut className='w-5 h-5' /> Sair
                    </Button>
                </aside>

                <header className="sm:hidden fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between p-3 z-20">
                    <ApplicationLogo className="w-28" />
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        {menuAberto ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
                    </Button>
                </header>

                {menuAberto && (
                    <div className="sm:hidden fixed top-14 left-0 right-0 bg-white shadow-lg z-10 flex flex-col items-start p-4 space-y-3 border-t">
                        {!temPermissao ? (
                            <NavLink href={route('pedidos.index')} active={route().current('pedidos.index')}>
                                <LuReceiptText className="w-5 h-5" /> Pedidos
                            </NavLink>
                        ) : (
                            <div className='flex flex-col w-full'>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <LuHouse className='w-5 h-5' /> Dashboard
                                </NavLink>
                                <NavLink href={route('pedidos.index')} active={route().current('pedidos.index')}>
                                    <LuReceiptText className="w-5 h-5" /> Pedidos
                                </NavLink>
                                <NavLink href={route('sabores.index')} active={route().current('sabores.index')}>
                                    <LuIceCreamCone className='w-5 h-5' /> Sabores
                                </NavLink>
                                <NavLink href={route('embalagens.index')} active={route().current('embalagens.index')}>
                                    <LuPackage className='w-5 h-5' /> Embalagens
                                </NavLink>
                                <NavLink href={route('funcionarios.index')} active={route().current('funcionarios.index')}>
                                    <LuUsers className='w-5 h-5' /> Funcionários
                                </NavLink>
                                <NavLink href={route('cargos.index')} active={route().current('cargos.index')}>
                                    <LuBriefcaseBusiness className='w-5 h-5' /> Cargos
                                </NavLink>
                            </div>
                        )}

                        <Button variant="ghost" className="mt-2 w-full" onClick={handleLogout}>
                            <LuLogOut className='w-5 h-5' /> Sair
                        </Button>
                    </div>
                )}

                <main className="flex-1 p-6 sm:ml-52 mt-12 sm:mt-0 transition-all">
                    {children}
                </main>
            </div>
        </div>
    );
}
