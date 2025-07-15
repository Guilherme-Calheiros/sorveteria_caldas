import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import CreateEembalagemModal from "@/Components/Embalagens/CreateEmbalagemModal";
import UpdateEembalagemModal from "@/Components/Embalagens/UpdateEmbalagemModal";
import { formataMoeda } from '@/Utils/moeda';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteEmbalagemModal from "@/Components/Embalagens/DeleteEmbalagemModal";

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
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mb-4 px-4 py-2 bg-secondary-color-500 text-white rounded hover:bg-secondary-color-700 flex items-center gap-2"
                    >
                        Adicionar Embalagem <FaPlus/>
                    </button>
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
                                    <div className="flex justify-center items-center gap-4">
                                        <button onClick={() => editarEmbalagem(embalagem)}>
                                            <FaEdit/>
                                        </button>
                                        <button onClick={() => excluirEmbalagem(embalagem)} className="text-red-500">
                                            <FaTrash/>
                                        </button>
                                    </div>
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

                <DeleteEmbalagemModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    embalagem={selectedEmbalagem}
                />
            </div>
        </AuthenticatedLayout>
    )
}