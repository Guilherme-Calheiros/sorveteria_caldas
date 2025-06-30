import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import CreateUserModal from '@/Components/Usuarios/CreateUserModal';
import UpdateUserModal from '@/Components/Usuarios/UpdateUserModal';
import DeleteUserModal from '@/Components/Usuarios/DeleteUserModal';
import { FaEdit, FaPlus } from "react-icons/fa";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formataTelefone } from '@/Utils/telefone';

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
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                        Adicionar Usuário <FaPlus/>
                    </button>
                </div>
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-100">
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
                        {usuarios.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td className="p-2 border">{user.id}</td>
                                <td className="p-2 border">{user.name}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{formataTelefone(user.telefone)}</td>
                                <td className="p-2 border">{cargos.find(cargo => cargo.id === user.cargo_id)?.name || 'Não informado'}</td>
                                <td className="p-2 border">{user.data_admissao}</td>
                                <td className="p-2 border space-x-2">
                                    <button onClick={() => editarUser(user)}>
                                        <FaEdit/>
                                    </button>
                                    <button onClick={() => excluirUser(user)} className={user.ativo ? 'text-red-500 hover:underline' : 'text-green-500 hover:underline'}>
                                        {user.ativo ? 'Desativar' : 'Ativar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
