import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import { LuPlus, LuSearch } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCargoModal from "@/Components/Cargos/CreateCargoModal";
import UpdateCargoModal from "@/Components/Cargos/UpdateCargoModal";
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";
import PrimaryButton from "@/Components/PrimaryButton";
import Paginator from "@/Components/Paginator";
import TextInput from "@/Components/TextInput";

export default function Index({ cargos }){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCargo, setSelectedCargo] = useState(null);
    const [termoBusca, setTermoBusca] = useState("");

    const excluirCargo = (cargo) => {
        setSelectedCargo(cargo);
        setShowDeleteModal(true);
    };

    const editarCargo = (cargo) => {
        setSelectedCargo(cargo)
        setShowUpdateModal(true)
    }

    const cargosFiltrados = cargos.data.filter((cargo) => {
        return cargo.name.toLowerCase().includes(termoBusca.toLowerCase())
    })

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Cargos"/>
                <div className="p-2 flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Lista de cargos</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <span className="absolute text-xs left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <LuSearch/>
                            </span>
                            <TextInput
                                className="px-8 bg-white"
                                placeholder="Buscar cargo..."
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />
                        </div>
                        <PrimaryButton
                            onClick={() => setShowCreateModal(true)}
                            className="text-base"
                        >
                            <LuPlus/> Adicionar Cargo 
                        </PrimaryButton>
                    </div>
                </div>
                <div className="rounded-lg shadow-sm overflow-hidden">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-2">ID</th>
                                <th className="p-2">Cargo</th>
                                <th className="p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {cargosFiltrados.map((cargo) => (
                                <tr key={cargo.id} className="text-center even:bg-gray-50 odd:bg-white">
                                    <td className="p-2">{cargo.id}</td>
                                    <td className="p-2">{cargo.name}</td>
                                    <td className="p-2">
                                        <TableActions
                                            onEditar={() => editarCargo(cargo)}
                                            onExcluir={() => excluirCargo(cargo)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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