import ApplicationLogo from '@/Components/ApplicationLogo';
import { LuReceiptText, LuIceCreamCone, LuHouse, LuPackage, LuUsers, LuBriefcaseBusiness, LuChevronDown } from "react-icons/lu";
import NavLink from '@/Components/NavLink';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const {user, temPermissao} = usePage().props.auth;

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex min-h-screen">
                <aside className="hidden w-52 bg-white py-4 px-4 space-y-2 sm:flex flex-col">
                    <ApplicationLogo className="w-36 mx-auto mb-10"/>
                    
                    <div>
                        {/* <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <LuHouse className='w-5 h-5 align-middle'/> 
                            Dashboard
                        </NavLink> */}

                        {temPermissao && (
                            <>
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
                                    href={route('usuarios.index')}
                                    active={route().current('usuarios.index')}
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
                </aside>
                <main className="flex-1 p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
