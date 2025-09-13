import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { formataMoeda } from '@/Utils/moeda';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Paginator from "@/Components/Paginator";
import { LuPlus } from "react-icons/lu";
import PrimaryButton from "@/Components/PrimaryButton";
import CreatePedidoModal from "@/Components/Pedidos/CreatePedidoModal";
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";

export default function Index({pedidos, embalagens, sabores, funcionarios}){
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    const excluirPedido = (pedido) => {
        setSelectedPedido(pedido);
        setShowDeleteModal(true);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Pedidos"/>
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de pedidos</h1>
                    <PrimaryButton
                        onClick={() => setShowCreateModal(true)}
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Pedido
                    </PrimaryButton>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
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
                                <td className="p-2 border capitalize">{pedido.cliente_nome ?? `#${pedido.id}`}</td>
                                <td className="p-2 border capitalize">{pedido.funcionario?.name ?? 'Autoatendimento'}</td>
                                <td className="p-2 border">{pedido.observacao || '-'}</td>
                                <td className="p-2 border">{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                                <td className="p-2 border">{formataMoeda(pedido.total)}</td>
                                <td className="p-2 border">
                                    <TableActions
                                        onEditar={() => editarPedido(pedido)}
                                        onExcluir={() => excluirPedido(pedido)}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paginator items={pedidos}/>
                <CreatePedidoModal
                    key={showCreateModal ? 'show' : 'hide'}
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    sabores={sabores}
                    embalagens={embalagens}
                    funcionarios={funcionarios}
                />
                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    element={selectedPedido}
                    routeName='pedidos.destroy'
                    label='Pedido'
                    message='Deseja mesmo excluir esse pedido?'
                />
            </div>
        </AuthenticatedLayout>
    )
}