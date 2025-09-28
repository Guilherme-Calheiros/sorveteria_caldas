import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import CreateSaborModal from "@/Components/Sabores/CreateSaborModal";
import UpdateSaborModal from "@/Components/Sabores/UpdateSaborModal";
import { LuPlus } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";
import PrimaryButton from "@/Components/PrimaryButton";
import Paginator from "@/Components/Paginator";
import CardSabor from "@/Components/Sabores/CardSabor";
import DeleteSaborModal from "@/Components/Sabores/DeleteSaborModal";

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
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Sabores"/>
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de sabores</h1>
                    <PrimaryButton
                        onClick={() => setShowCreateModal(true)}
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Sabor
                    </PrimaryButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                    {sabores.data.map((sabor) =>
                        <CardSabor
                            key={sabor.id}
                            sabor={sabor}
                            onEditar={() => editarSabor(sabor)}
                            onExcluir={() => excluirSabor(sabor)}
                        />
                    )}
                    {sabores.data.length === 0 && (
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
                <DeleteSaborModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    sabor={selectedSabor}
                />
            </div>
        </AuthenticatedLayout>
    )
}