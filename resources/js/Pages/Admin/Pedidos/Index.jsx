import { Head, Link } from "@inertiajs/react";
import React from "react";
import { formataMoeda } from '@/Utils/moeda';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
                        <tr className="bg-slate-500">
                            <th className="p-2 border text-white">ID</th>
                            <th className="p-2 border text-white">Cliente</th>
                            <th className="p-2 border text-white">Funcionario</th>
                            <th className="p-2 border text-white">Observação</th>
                            <th className="p-2 border text-white">Data</th>
                            <th className="p-2 border text-white">Total</th>
                            <th className="p-2 border text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.data.map((pedido) =>
                            <tr key={pedido.id} className="text-center">
                                <td className="p-2 border">{pedido.id}</td>
                                <td className="p-2 border">{pedido.cliente.name}</td>
                                <td className="p-2 border">{pedido.funcionario?.name ?? 'Autoatendimento'}</td>
                                <td className="p-2 border">{pedido.observacao || '-'}</td>
                                <td className="p-2 border">{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                                <td className="p-2 border">{formataMoeda(pedido.total)}</td>
                                <td className="p-2 border">Teste</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px' }}>
                    {pedidos.prev_page_url && (
                        <Link href={pedidos.prev_page_url}>&laquo; Anterior</Link>
                    )}

                    <span style={{ margin: '0 10px' }}>
                        Página {pedidos.current_page} de {pedidos.last_page}
                    </span>

                    {pedidos.next_page_url && (
                        <Link href={pedidos.next_page_url}>Próxima &raquo;</Link>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}