import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import { LuPlus } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCargoModal from "@/Components/Cargos/CreateCargoModal";
import UpdateCargoModal from "@/Components/Cargos/UpdateCargoModal";
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";
import PrimaryButton from "@/Components/PrimaryButton";
import Paginator from "@/Components/Paginator";

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
                <div className="p-2 flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Lista de cargos</h1>
                    <PrimaryButton
                        onClick={() => setShowCreateModal(true)}
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Cargo 
                    </PrimaryButton>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary text-white">
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

                <Paginator items={cargos}/>

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