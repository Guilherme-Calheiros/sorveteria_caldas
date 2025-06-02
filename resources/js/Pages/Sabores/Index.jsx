import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import CreateSaborModal from "@/Components/Sabores/CreateSaborModal";
import UpdateSaborModal from "@/Components/Sabores/UpdateSaborModal";
import DeleteSaborModal from "@/Components/Sabores/DeleteSaborModal";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

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
        <div className="p-4">
            <Head title="Sabores"/>
            <div className="p-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lista de sabores</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                    Adicionar Sabor <FaPlus/>
                </button>
            </div>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-slate-500">
                        <th className="p-2 border text-white">ID</th>
                        <th className="p-2 border text-white">Sabor</th>
                        <th className="p-2 border text-white">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sabores.map((sabor) => (
                        <tr key={sabor.id} className="text-center">
                            <td className="p-2 border">{sabor.id}</td>
                            <td className="p-2 border">{sabor.name}</td>
                            <td className="p-2 border">
                                <div className="flex justify-center items-center gap-4">
                                    <button onClick={() => editarSabor(sabor)}>
                                        <FaEdit/>
                                    </button>
                                    <button onClick={() => excluirSabor(sabor)} className="text-red-500">
                                        <FaTrash/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteSaborModal
                show={showDeleteModal} 
                onClose={() => setShowDeleteModal(false)}
                sabor={selectedSabor}
            />

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
        </div>
    )
}