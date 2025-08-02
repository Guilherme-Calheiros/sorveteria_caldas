import { Head, Link } from "@inertiajs/react";
import React from "react";
import { formataMoeda } from '@/Utils/moeda';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Paginator from "@/Components/Paginator";

export default function Index({pedidos}){
    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Pedidos"/>
                <div className="p-2 flex justify-between items-center">
                    <h1>Lista de pedidos</h1>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Cliente</th>
                            <th className="p-2 border">Funcionario</th>
                            <th className="p-2 border">Observação</th>
                            <th className="p-2 border">Data</th>
                            <th className="p-2 border">Total</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.data.map((pedido) =>
                            <tr key={pedido.id} className="text-center bg-white">
                                <td className="p-2 border">{pedido.id}</td>
                                <td className="p-2 border capitalize">{pedido.cliente.name}</td>
                                <td className="p-2 border capitalize">{pedido.funcionario?.name ?? 'Autoatendimento'}</td>
                                <td className="p-2 border">{pedido.observacao || '-'}</td>
                                <td className="p-2 border">{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                                <td className="p-2 border">{formataMoeda(pedido.total)}</td>
                                <td className="p-2 border">Teste</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paginator items={pedidos}/>
            </div>
        </AuthenticatedLayout>
    )
}