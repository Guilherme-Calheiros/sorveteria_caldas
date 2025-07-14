import ApplicationLogo from '@/Components/ApplicationLogo';
import { RxDashboard } from "react-icons/rx";
import { IoIceCreamOutline } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import { MdPeople, MdOutlineShoppingCart } from "react-icons/md";
import { BsSuitcaseLg } from "react-icons/bs";
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const {user, temPermissao} = usePage().props.auth;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex min-h-screen">
                <aside className="hidden w-52 bg-white py-4 px-4 space-y-2 sm:flex flex-col">
                    <ApplicationLogo className="w-36 mx-auto mb-10"/>
                    
                    <div>
                        <NavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <RxDashboard className='w-5 h-5 align-middle'/> 
                            Dashboard
                        </NavLink>

                        {temPermissao && (
                            <>
                                <NavLink
                                    href={route('pedidos.index')}
                                    active={route().current('pedidos.index')}
                                >
                                    <MdOutlineShoppingCart className="w-5 h-5"/>
                                    Pedidos
                                </NavLink>

                                <NavLink
                                    href={route('sabores.index')}
                                    active={route().current('sabores.index')}
                                >
                                    <IoIceCreamOutline className='w-5 h-5'/>
                                    Sabores
                                </NavLink>

                                <NavLink
                                    href={route('embalagens.index')}
                                    active={route().current('embalagens.index')}
                                >
                                    <FiPackage className='w-5 h-5'/>
                                    Embalagens
                                </NavLink>

                                <NavLink
                                    href={route('usuarios.index')}
                                    active={route().current('usuarios.index')}
                                >
                                    <MdPeople className='w-5 h-5'/>
                                    Funcionários
                                </NavLink>

                                <NavLink
                                    href={route('cargos.index')}
                                    active={route().current('cargos.index')}
                                >
                                    <BsSuitcaseLg className='w-5 h-5'/>
                                    Cargos
                                </NavLink>
                            </>
                        )}
                    </div>
                </aside>
                <main className="flex-1 p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
