import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import CreateEembalagemModal from "@/Components/Embalagens/CreateEmbalagemModal";
import { formataMoeda } from '@/Utils/moeda';

export default function Index({ embalagens }){
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <div className="p-4">
            <Head title="Embalagens"/>
            <div className="p-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lista de embalagens</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                    Adicionar Embalagem <FaPlus/>
                </button>
            </div>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-slate-500">
                        <th className="p-2 border text-white">ID</th>
                        <th className="p-2 border text-white">Nome</th>
                        <th className="p-2 border text-white">Máximo de sabores</th>
                        <th className="p-2 border text-white">Valor sabor extra </th>
                        <th className="p-2 border text-white">Valor base</th>
                        <th className="p-2 border text-white">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {embalagens.map((embalagem) => (
                        <tr key={embalagem.id} className="text-center">
                            <td className="p-2 border">{embalagem.id}</td>
                            <td className="p-2 border capitalize">{embalagem.name}</td>
                            <td className="p-2 border">{embalagem.maximo_sabores}</td>
                            <td className="p-2 border">{formataMoeda(embalagem.preco_sabor_extra)}</td>
                            <td className="p-2 border">{formataMoeda(embalagem.valor_base)}</td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center gap-4">
                                    <button onClick={() => {}}>
                                        <FaEdit/>
                                    </button>
                                    <button onClick={() => {}} className="text-red-500">
                                        <FaTrash/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CreateEembalagemModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
        </div>
    )
}