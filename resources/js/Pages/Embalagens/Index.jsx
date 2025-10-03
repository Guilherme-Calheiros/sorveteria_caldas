import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';
import { LuPlus, LuSearch } from "react-icons/lu";
import CreateEembalagemModal from "@/Components/Embalagens/CreateEmbalagemModal";
import UpdateEembalagemModal from "@/Components/Embalagens/UpdateEmbalagemModal";
import { formataMoeda } from '@/Utils/moeda';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteModal from "@/Components/DeleteModal";
import TableActions from "@/Components/TableActions";
import PrimaryButton from "@/Components/PrimaryButton";
import Paginator from "@/Components/Paginator";
import CardEmbalagem from "@/Components/Embalagens/CardEmbalagem";
import TextInput from "@/Components/TextInput";

export default function Index({ embalagens }){
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEmbalagem, setSelectedEmbalagem] = useState(false);
    const [termoBusca, setTermoBusca] = useState("");

    const editarEmbalagem = (embalagem) => {
        setSelectedEmbalagem(embalagem)
        setShowUpdateModal(true)
    };

    const excluirEmbalagem = (embalagem) => {
        setSelectedEmbalagem(embalagem);
        setShowDeleteModal(true);
    };

    const embalagensFiltradas = embalagens.data.filter((embalagem) =>
        embalagem.name.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Embalagens"/>
                <div className="p-2 flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Lista de embalagens</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <span className="absolute text-xs left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <LuSearch/>
                            </span>
                            <TextInput
                                className="px-8 bg-white"
                                placeholder="Buscar embalagem..."
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />
                        </div>
                        <PrimaryButton
                            onClick={() => setShowCreateModal(true)}
                            className="text-base"
                        >
                            <LuPlus/> Adicionar Embalagem
                        </PrimaryButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                    {embalagensFiltradas.map((embalagem) =>
                        <CardEmbalagem
                            key={embalagem.id}
                            embalagem={embalagem}
                            onEditar={() => editarEmbalagem(embalagem)}
                            onExcluir={() => excluirEmbalagem(embalagem)}
                        />
                    )}
                    {embalagensFiltradas.length === 0 && (
                        <div className="text-xl text-center col-span-full mt-10">Nenhuma embalagem encontrada</div>
                    )}
                </div>
                
                <Paginator items={embalagens}/>

                <CreateEembalagemModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                />

                <UpdateEembalagemModal
                    show={showUpdateModal} 
                    onClose={() => setShowUpdateModal(false)}
                    embalagem={selectedEmbalagem}
                />

                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    element={selectedEmbalagem}
                    routeName='embalagens.destroy'
                    label='Embalagem'
                    message={`Tem certeza que deseja excluir a embalagem "${selectedEmbalagem?.name}"?`}
                />
            </div>
        </AuthenticatedLayout>
    )
}