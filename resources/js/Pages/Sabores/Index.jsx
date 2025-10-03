import React, { useState } from "react";
import { Head, useForm } from '@inertiajs/react';
import CreateSaborModal from "@/Components/Sabores/CreateSaborModal";
import UpdateSaborModal from "@/Components/Sabores/UpdateSaborModal";
import { LuPlus, LuSearch } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteModal from "@/Components/DeleteModal";
import PrimaryButton from "@/Components/PrimaryButton";
import Paginator from "@/Components/Paginator";
import CardSabor from "@/Components/Sabores/CardSabor";
import TextInput from "@/Components/TextInput";

export default function Index({ sabores }){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedSabor, setSelectedSabor] = useState(null)
    const [termoBusca, setTermoBusca] = useState("");

    const { patch } = useForm();

    const toggleEstadoSabor = (sabor) => {
        if (sabor?.disponivel) {
            patch(route('sabores.desativar', sabor.id));
        } else {
            patch(route('sabores.reativar', sabor.id));
        }
    };

    const excluirSabor = (sabor) => {
        setSelectedSabor(sabor);
        setShowDeleteModal(true);
    };

    const editarSabor = (sabor) => {
        setSelectedSabor(sabor)
        setShowUpdateModal(true)
    }

    const saboresFiltrados = sabores.data.filter((sabor) =>
        sabor.name.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Sabores"/>
                <div className="p-2 flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Lista de sabores</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <span className="absolute text-xs left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <LuSearch/>
                            </span>
                            <TextInput
                                className="px-8 bg-white"
                                placeholder="Buscar sabor..."
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />
                        </div>
                        <PrimaryButton
                            onClick={() => setShowCreateModal(true)}
                            className="text-base"
                        >
                            <LuPlus/> Adicionar Sabor
                        </PrimaryButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                    {saboresFiltrados.map((sabor) =>
                        <CardSabor
                            key={sabor.id}
                            sabor={sabor}
                            onToggleEstado={() => toggleEstadoSabor(sabor)}
                            onEditar={() => editarSabor(sabor)}
                            onExcluir={() => excluirSabor(sabor)}
                        />
                    )}
                    {saboresFiltrados.length === 0 && (
                        <div className="text-xl text-center col-span-full mt-10">Nenhum sabor encontrado</div>
                    )}
                </div>
                <Paginator items={sabores}/>
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