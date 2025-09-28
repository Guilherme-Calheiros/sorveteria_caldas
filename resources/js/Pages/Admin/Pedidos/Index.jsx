import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Paginator from "@/Components/Paginator";
import { LuPlus } from "react-icons/lu";
import PrimaryButton from "@/Components/PrimaryButton";
import CreatePedidoModal from "@/Components/Pedidos/CreatePedidoModal";
import CardPedido from "@/Components/Pedidos/CardPedido";

export default function Index({pedidos, embalagens, sabores, funcionarios}){
    const [showCreateModal, setShowCreateModal] = useState(false);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                    {pedidos.data.map((pedido) =>
                        <CardPedido
                            key={pedido.id}
                            pedido={pedido}
                        />
                    )}
                    {pedidos.data.length === 0 && (
                        <div className="text-xl text-center col-span-full mt-10">Nenhum pedido encontrado</div>
                    )}
                </div>
                <Paginator items={pedidos}/>
                <CreatePedidoModal
                    key={showCreateModal ? 'show' : 'hide'}
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    sabores={sabores}
                    embalagens={embalagens}
                    funcionarios={funcionarios}
                />
            </div>
        </AuthenticatedLayout>
    )
}