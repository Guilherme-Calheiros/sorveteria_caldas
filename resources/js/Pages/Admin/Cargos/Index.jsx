import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { LuTrash, LuSquarePen, LuPlus } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCargoModal from "@/Components/Cargos/CreateCargoModal";
import UpdateCargoModal from "@/Components/Cargos/UpdateCargoModal";
import { Button } from "@/Components/ui/button";
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";

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
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        variant="secondary"
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Cargo 
                    </Button>
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
                                    <TableActions
                                        onEditar={() => editarCargo(cargo)}
                                        onExcluir={() => excluirCargo(cargo)}
                                    />
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
                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    element={selectedCargo}
                    routeName='cargos.destroy'
                    label='Cargo'
                    message={`Tem certeza que deseja excluir o cargo "${selectedCargo?.name}"?`}
                />
            </div>
        </AuthenticatedLayout>
    )
}