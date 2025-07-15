import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCargoModal from "@/Components/Cargos/CreateCargoModal";
import UpdateCargoModal from "@/Components/Cargos/UpdateCargoModal";
import DeleteCargoModal from "@/Components/Cargos/DeleteCargoModal";

export default function Index({ cargos }){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCargo, setSelectedCargo] = useState(null)

    const excluirCargo = (cargo) => {
        setSelectedCargo(cargo);
        setShowDeleteModal(true);
    };

    const editarCargo = (cargo) => {
        setSelectedCargo(cargo)
        setShowUpdateModal(true)
    }

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Cargos"/>
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de cargos</h1>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mb-4 px-4 py-2 bg-secondary-color-500 text-white rounded hover:bg-secondary-color-700 flex items-center gap-2"
                    >
                        Adicionar Cargo <FaPlus/>
                    </button>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Cargo</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargos.data.map((cargo) => (
                            <tr key={cargo.id} className="text-center bg-white">
                                <td className="p-2 border">{cargo.id}</td>
                                <td className="p-2 border">{cargo.name}</td>
                                <td className="p-2 border">
                                    <div className="flex justify-center items-center gap-4">
                                        <button onClick={() => editarCargo(cargo)} className="text-text-color-primary">
                                            <FaEdit/>
                                        </button>
                                        <button onClick={() => excluirCargo(cargo)} className="text-text-color-primary">
                                            <FaTrash/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    {cargos.prev_page_url && (
                        <Link href={cargos.prev_page_url}>&laquo; Anterior</Link>
                    )}

                    <span className="text-text-color-secondary my-3">
                        Página {cargos.current_page} de {cargos.last_page}
                    </span>

                    {cargos.next_page_url && (
                        <Link href={cargos.next_page_url}>Próxima &raquo;</Link>
                    )}
                </div>
                <CreateCargoModal
                    key={showCreateModal ? 'show' : 'hide'}
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />
                <UpdateCargoModal
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    cargo={selectedCargo}
                />
                <DeleteCargoModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    cargo={selectedCargo}
                />
            </div>
        </AuthenticatedLayout>
    )
}