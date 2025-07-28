import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { LuPlus } from "react-icons/lu";
import CreateEembalagemModal from "@/Components/Embalagens/CreateEmbalagemModal";
import UpdateEembalagemModal from "@/Components/Embalagens/UpdateEmbalagemModal";
import { formataMoeda } from '@/Utils/moeda';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ embalagens }){
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedEmbalagem, setSelectedEmbalagem] = useState(false)

    const editarEmbalagem = (embalagem) => {
        setSelectedEmbalagem(embalagem)
        setShowUpdateModal(true)
    }

    const excluirEmbalagem = (embalagem) => {
        setSelectedEmbalagem(embalagem);
        setShowDeleteModal(true);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Embalagens"/>
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de embalagens</h1>
                    <PrimaryButton
                        onClick={() => setShowCreateModal(true)}
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Embalagem
                    </PrimaryButton>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Nome</th>
                            <th className="p-2 border">Máximo de sabores</th>
                            <th className="p-2 border">Valor sabor extra </th>
                            <th className="p-2 border">Valor base</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {embalagens.data.map((embalagem) => (
                            <tr key={embalagem.id} className="text-center bg-white">
                                <td className="p-2 border">{embalagem.id}</td>
                                <td className="p-2 border capitalize">{embalagem.name}</td>
                                <td className="p-2 border">{embalagem.maximo_sabores}</td>
                                <td className="p-2 border">{formataMoeda(embalagem.preco_sabor_extra)}</td>
                                <td className="p-2 border">{formataMoeda(embalagem.valor_base)}</td>
                                <td className="p-2 border">
                                    <TableActions
                                        onEditar={() => editarEmbalagem(embalagem)}
                                        onExcluir={() => excluirEmbalagem(embalagem)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    {embalagens.prev_page_url && (
                        <Link href={embalagens.prev_page_url}>&laquo; Anterior</Link>
                    )}

                    <span className="text-text-color-secondary my-3">
                        Página {embalagens.current_page} de {embalagens.last_page}
                    </span>

                    {embalagens.next_page_url && (
                        <Link href={embalagens.next_page_url}>Próxima &raquo;</Link>
                    )}
                </div>

                <CreateEembalagemModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />

                <UpdateEembalagemModal
                    show={showUpdateModal} 
                    onClose={() => setShowUpdateModal(false)}
                    embalagem={selectedEmbalagem}
                />

                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    element={selectedEmbalagem}
                    routeName='embalagens.destroy'
                    label='Embalagem'
                    message={`Tem certeza que deseja excluir a embalagem "${selectedEmbalagem?.name}"?`}
                />
            </div>
        </AuthenticatedLayout>
    )
}