import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Paginator from '@/Components/Paginator';

export default function Index({ usuarios }) {
    console.log(usuarios)

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Usuarios do Sistema" />
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de usuários</h1>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Nome</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Perfil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios?.map((user) => (
                            <tr key={user.id} className="text-center bg-white">
                                <td className="p-2 border">{user.id}</td>
                                <td className="p-2 border">{user.name}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.perfil}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Paginator items={usuarios}/>

            </div>
        </AuthenticatedLayout>
    );
}
