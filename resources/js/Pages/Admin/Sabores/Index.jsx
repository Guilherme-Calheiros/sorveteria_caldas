import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import CreateSaborModal from "@/Components/Sabores/CreateSaborModal";
import UpdateSaborModal from "@/Components/Sabores/UpdateSaborModal";
import { LuPlus } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ sabores }){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedSabor, setSelectedSabor] = useState(null)

    const excluirSabor = (sabor) => {
        setSelectedSabor(sabor);
        setShowDeleteModal(true);
    };

    const editarSabor = (sabor) => {
        setSelectedSabor(sabor)
        setShowUpdateModal(true)
    }

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Sabores"/>
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de sabores</h1>
                    <PrimaryButton
                        onClick={() => setShowCreateModal(true)}
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Sabor
                    </PrimaryButton>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Sabor</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sabores.data.map((sabor) => (
                            <tr key={sabor.id} className="text-center bg-white">
                                <td className="p-2 border">{sabor.id}</td>
                                <td className="p-2 border">{sabor.name}</td>
                                <td className="p-2 border">
                                    <TableActions
                                        onEditar={() => editarSabor(sabor)}
                                        onExcluir={() => excluirSabor(sabor)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    {sabores.prev_page_url && (
                        <Link href={sabores.prev_page_url}>&laquo; Anterior</Link>
                    )}

                    <span className="text-text-color-secondary my-3">
                        Página {sabores.current_page} de {sabores.last_page}
                    </span>

                    {sabores.next_page_url && (
                        <Link href={sabores.next_page_url}>Próxima &raquo;</Link>
                    )}
                </div>
                <CreateSaborModal
                    key={showCreateModal ? 'show' : 'hide'}
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />
                <UpdateSaborModal
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    sabor={selectedSabor}
                />
                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    element={selectedSabor}
                    routeName='sabores.destroy'
                    label='Sabor'
                    message={`Tem certeza que deseja excluir o sabor "${selectedSabor?.name}"?`}
                />
            </div>
        </AuthenticatedLayout>
    )
}