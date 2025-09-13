import ApplicationLogo from '@/Components/ApplicationLogo';
import { LuReceiptText, LuIceCreamCone, LuHouse, LuPackage, LuUsers, LuBriefcaseBusiness, LuLogOut } from "react-icons/lu";
import NavLink from '@/Components/NavLink';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function AuthenticatedLayout({ children }) {
    const {temPermissao} = usePage().props.auth;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'))
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex min-h-screen">
                <aside className="hidden w-52 bg-white py-4 px-4 space-y-2 sm:flex flex-col justify-between">
                    <div>
                        <ApplicationLogo className="w-36 mx-auto mb-10"/>
                        {!temPermissao ?
                            <NavLink
                                href={route('caixa.dashboard')}
                                active={route().current('caixa.dashboard')}
                            >
                                <LuHouse className='w-5 h-5 align-middle'/>
                                Dashboard
                            </NavLink> : (
                                <>
                                    <NavLink
                                        href={route('admin.dashboard')}
                                        active={route().current('admin.dashboard')}
                                    >
                                        <LuHouse className='w-5 h-5 align-middle'/>
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route('pedidos.index')}
                                        active={route().current('pedidos.index')}
                                    >
                                        <LuReceiptText className="w-5 h-5"/>
                                        Pedidos
                                    </NavLink>
                                    <NavLink
                                        href={route('sabores.index')}
                                        active={route().current('sabores.index')}
                                    >
                                        <LuIceCreamCone className='w-5 h-5'/>
                                        Sabores
                                    </NavLink>
                                    <NavLink
                                        href={route('embalagens.index')}
                                        active={route().current('embalagens.index')}
                                    >
                                        <LuPackage className='w-5 h-5'/>
                                        Embalagens
                                    </NavLink>
                                    <NavLink
                                        href={route('funcionarios.index')}
                                        active={route().current('funcionarios.index')}
                                    >
                                        <LuUsers className='w-5 h-5'/>
                                        Funcionários
                                    </NavLink>
                                    <NavLink
                                        href={route('cargos.index')}
                                        active={route().current('cargos.index')}
                                    >
                                        <LuBriefcaseBusiness className='w-5 h-5'/>
                                        Cargos
                                    </NavLink>
                                </>
                            )}
                    </div>


                    <Button variant="ghost" onClick={handleLogout}>
                        <LuLogOut className='w-5 h-5 align-middle'/> Sair
                    </Button>
                </aside>
                <main className="flex-1 p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
