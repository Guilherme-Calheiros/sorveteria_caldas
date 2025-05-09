import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import ConfirmationModal from '@/Components/ConfirmationModal';

export default function Index({ usuarios }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState(''); // 'desativar' ou 'reativar'

    const confirmToggleStatus = (user) => {
        setSelectedUser(user);
        setActionType(user.ativo ? 'desativar' : 'reativar');
        setShowModal(true);
    };

    const handleToggleStatus = () => {
        if (actionType === 'desativar') {
            router.delete(route('usuarios.destroy', selectedUser.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedUser(null);
                    setActionType('');
                },
            });
        } else {
            router.patch(route('usuarios.reativar', selectedUser.id), {}, {
                onSuccess: () => {
                    setShowModal(false);
                    setSelectedUser(null);
                    setActionType('');
                },
            });
        }
    };

    return (
        <div className="p-4">
            <Head title="Funcionários" />
            <h1 className="text-2xl font-bold mb-4">Lista de Funcionários</h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Nome</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Telefone</th>
                        <th className="p-2 border">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="p-2 border">{user.id}</td>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            <td className="p-2 border">{user.telefone}</td>
                            <td className="p-2 border space-x-2">
                                <a
                                    href={route('usuarios.edit', user.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Editar
                                </a>
                                <button
                                    onClick={() => confirmToggleStatus(user)}
                                    className={
                                        user.ativo
                                            ? 'text-red-600 hover:underline'
                                            : 'text-green-600 hover:underline'
                                    }
                                >
                                    {user.ativo ? 'Desativar' : 'Reativar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmationModal
                show={showModal}
                title={
                    actionType === 'desativar'
                        ? 'Desativar Funcionário'
                        : 'Reativar Funcionário'
                }
                message={
                    selectedUser &&
                    `Tem certeza que deseja ${actionType} o funcionário "${selectedUser.name}"?`
                }
                confirmText={actionType === 'desativar' ? 'Desativar' : 'Reativar'}
                cancelText="Cancelar"
                onClose={() => setShowModal(false)}
                onConfirm={handleToggleStatus}
            />
        </div>
    );
}
