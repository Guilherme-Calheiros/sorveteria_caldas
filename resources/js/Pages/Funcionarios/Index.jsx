import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CreateFuncionarioModal from '@/Components/Funcionarios/CreateFuncionarioModal';
import UpdateFuncionarioModal from '@/Components/Funcionarios/UpdateFuncionarioModal';
import { LuPlus, LuPen, LuTrash } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formataTelefone } from '@/Utils/telefone';
import { Button } from '@/Components/ui/button';
import PrimaryButton from '@/Components/PrimaryButton';
import Paginator from '@/Components/Paginator';
import { formataCpf } from '@/Utils/cpf';
import DeleteModal from '@/Components/DeleteModal';

export default function Index({ funcionarios, cargos }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);

    const { patch } = useForm();

    const toggleEstadoFuncionario = (funcionario) => {
        if (funcionario?.disponivel) {
            patch(route('funcionarios.desativar', funcionario.id));
        } else {
            patch(route('funcionarios.reativar', funcionario.id));
        }
    };

    const editarFuncionario = (funcionario) => {
        setSelectedFuncionario(funcionario)
        setShowUpdateModal(true)
    }

    const excluirFuncionario = (funcionario) => {
        setSelectedFuncionario(funcionario)
        setShowDeleteModal(true)
    }

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Funcionários" />
                <div className="p-2 flex justify-between items-center m-4">
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
                        <tr className="bg-primary text-white">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Nome</th>
                            <th className="p-2 border">CPF</th>
                            <th className="p-2 border">Telefone</th>
                            <th className="p-2 border">Cargo</th>
                            <th className="p-2 border">Data de admissão</th>
                            <th className="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.data.map((funcionario) => (
                            <tr key={funcionario.id} className="text-center bg-white">
                                <td className="p-2 border">{funcionario.id}</td>
                                <td className="p-2 border">{funcionario.name}</td>
                                <td className="p-2 border">{formataCpf(funcionario.cpf)}</td>
                                <td className="p-2 border">{formataTelefone(funcionario.telefone)}</td>
                                <td className="p-2 border">{cargos.find(cargo => cargo.id === funcionario.cargo_id)?.name || 'Não informado'}</td>
                                <td className="p-2 border">{funcionario.data_admissao}</td>
                                <td className="p-2 border">
                                    <div className='flex justify-center items-center'>
                                        <Button onClick={() => toggleEstadoFuncionario(funcionario)} variant="link" className={funcionario.ativo ? 'text-red-500' : 'text-green-500 hover:underline'}>
                                            {funcionario.ativo ? 'Desativar' : 'Ativar'}
                                        </Button>
                                        <Button onClick={() => editarFuncionario(funcionario)} variant="ghost" size="icon">
                                            <LuPen/>
                                        </Button>
                                        <Button onClick={() => excluirFuncionario(funcionario)} variant="ghost">
                                            <LuTrash/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Paginator items={funcionarios}/>

                <CreateFuncionarioModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    cargos={cargos}
                />

                <UpdateFuncionarioModal
                    show={showUpdateModal} 
                    onClose={() => setShowUpdateModal(false)}
                    cargos={cargos}
                    funcionario={selectedFuncionario}
                />

               <DeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    element={selectedFuncionario}
                    routeName='funcionarios.destroy'
                    label='Funcionário'
                    message={`Tem certeza que deseja excluir o funcionário "${selectedFuncionario?.name}"?`}
                />

            </div>
        </AuthenticatedLayout>
    );
}
