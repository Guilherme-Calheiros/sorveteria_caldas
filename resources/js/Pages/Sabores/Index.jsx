import React, { useState } from "react";
import { Head, router } from '@inertiajs/react';
import ConfirmationModal from "@/Components/ConfirmationModal";
import CreateSaborModal from "@/Components/Sabores/CreateSaborModal";
import EditSaborModal from "@/Components/Sabores/EditSaborModal";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

export default function Index({ sabores }){
    const [showModalConfimation, setShowModalConfimation] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedSabor, setSelectedSabor] = useState(null)

    const confirmExcluirSabor = (sabor) => {
        setSelectedSabor(sabor);
        setShowModalConfimation(true);
    };

    const handleExcluirSabor = () => {
        router.delete(route('sabores.destroy', selectedSabor.id), {
            onSuccess: () => {
                setShowModalConfimation(false);
                setSelectedSabor(null);
            },
        });
    };

    const editarSabor = (sabor) => {
        setSelectedSabor(sabor)
        setShowModalEdit(true)
    }

    return (
        <div className="p-4">
            <Head title="Sabores"/>
            <div className="p-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lista de sabores</h1>
                <button
                    onClick={() => setShowModalCreate(true)}
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
                                    <button onClick={() => confirmExcluirSabor(sabor)} className="text-red-500">
                                        <FaTrash/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal
                show={showModalConfimation}
                title={
                    'Excluir Sabor'
                }
                message={
                    selectedSabor &&
                    `Tem certeza que deseja excluir o sabor "${selectedSabor.name}"?`
                }
                confirmText='Excluir'
                cancelText="Cancelar"
                onClose={() => setShowModalConfimation(false)}
                onConfirm={handleExcluirSabor}
            />

            <CreateSaborModal 
                key={showModalCreate ? 'show' : 'hide'}
                show={showModalCreate} 
                onClose={() => setShowModalCreate(false)} 
            />

            <EditSaborModal
                show={showModalEdit} 
                onClose={() => setShowModalEdit(false)}
                sabor={selectedSabor}
            />
        </div>
    )
}