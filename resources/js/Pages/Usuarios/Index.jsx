import React from 'react';
import { Head } from '@inertiajs/react';

export default function Index({ usuarios }) {
    return (
        <div className="p-4">
            <Head title="Funcionários" />
            <h1 className="text-2xl font-bold mb-4">Lista de Funcionários</h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Nome</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
