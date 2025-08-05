import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import CreateUserModal from '@/Components/Usuarios/CreateUserModal';
import UpdateUserModal from '@/Components/Usuarios/UpdateUserModal';
import DeleteUserModal from '@/Components/Usuarios/DeleteUserModal';
import { LuSquarePen, LuPlus } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formataTelefone } from '@/Utils/telefone';
import { Button } from '@/Components/ui/button';
import PrimaryButton from '@/Components/PrimaryButton';
import Paginator from '@/Components/Paginator';

export default function Index({ usuarios, cargos }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const editarUser = (user) => {
        setSelectedUser(user)
        setShowUpdateModal(true)
    }

    const excluirUser = (user) => {
        setSelectedUser(user)
        setShowDeleteModal(true)
    }

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Funcionários" />
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de usuários</h1>
                    <PrimaryButton
                        onClick={() => setShowCreateModal(true)}
                        className="text-base"
                    >
                        <LuPlus/> Adicionar Funcionário
                    </PrimaryButton>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-primary-color-500 text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Nome</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Telefone</th>
                            <th className="p-2 border">Cargo</th>
                            <th className="p-2 border">Data de admissão</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.data.map((user) => (
                            <tr key={user.id} className="text-center bg-white">
                                <td className="p-2 border">{user.id}</td>
                                <td className="p-2 border">{user.name}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{formataTelefone(user.telefone)}</td>
                                <td className="p-2 border">{cargos.find(cargo => cargo.id === user.cargo_id)?.name || 'Não informado'}</td>
                                <td className="p-2 border">{user.data_admissao}</td>
                                <td className="p-2 border">
                                    <div className='flex justify-center items-center'>
                                        <Button onClick={() => editarUser(user)} variant="ghost" size="icon">
                                            <LuSquarePen/>
                                        </Button>
                                        <Button onClick={() => excluirUser(user)} variant="link" className={user.ativo ? 'text-red-500' : 'text-green-500 hover:underline'}>
                                            {user.ativo ? 'Desativar' : 'Ativar'}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Paginator items={usuarios}/>

                <CreateUserModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    cargos={cargos}
                />

                <UpdateUserModal
                    show={showUpdateModal} 
                    onClose={() => setShowUpdateModal(false)}
                    cargos={cargos}
                    user={selectedUser}
                />

                <DeleteUserModal
                    show={showDeleteModal} 
                    onClose={() => setShowDeleteModal(false)}
                    user={selectedUser}
                />

            </div>
        </AuthenticatedLayout>
    );
}
