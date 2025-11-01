import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import CreateFuncionarioModal from '@/Components/Funcionarios/CreateFuncionarioModal';
import UpdateFuncionarioModal from '@/Components/Funcionarios/UpdateFuncionarioModal';
import { LuPlus, LuPen, LuTrash, LuSearch } from "react-icons/lu";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formataTelefone } from '@/Utils/telefone';
import { Button } from '@/Components/ui/button';
import PrimaryButton from '@/Components/PrimaryButton';
import Paginator from '@/Components/Paginator';
import { formataCpf } from '@/Utils/cpf';
import DeleteModal from '@/Components/DeleteModal';
import TextInput from '@/Components/TextInput';

export default function Index({ funcionarios, cargos }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);
    const [termoBusca, setTermoBusca] = useState("");

    const { patch } = useForm();

    const toggleEstadoFuncionario = (funcionario) => {
        if (funcionario?.ativo) {
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

    const funcionariosFiltrados = funcionarios.data.filter((funcionario) => {
        return funcionario.name.toLowerCase().includes(termoBusca.toLowerCase())
    })

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <Head title="Funcionários" />
                <div className="p-2 flex justify-between items-center m-4">
                    <h1 className="text-2xl font-bold">Lista de funcionários</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <span className="absolute text-xs left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <LuSearch/>
                            </span>
                            <TextInput
                                className="px-8 bg-white"
                                placeholder="Buscar funcionário..."
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />
                        </div>
                        <PrimaryButton
                            onClick={() => setShowCreateModal(true)}
                            className="text-base"
                        >
                            <LuPlus/> Adicionar Funcionário
                        </PrimaryButton>
                    </div>
                </div>
                <div className='rounded-lg overflow-hidden shadow-sm'>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-2">ID</th>
                                <th className="p-2">NOME</th>
                                <th className="p-2">CPF</th>
                                <th className="p-2">TELEFONE</th>
                                <th className="p-2">CARGO</th>
                                <th className="p-2">DATA DE ADMISSÃO</th>
                                <th className="p-2">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {funcionariosFiltrados.map((funcionario) => (
                                <tr key={funcionario.id} className="text-center even:bg-gray-50 odd:bg-white">
                                    <td className="p-2 font-semibold">#{funcionario.id}</td>
                                    <td className="p-2 font-semibold">{funcionario.name}</td>
                                    <td className="p-2">{formataCpf(funcionario.cpf)}</td>
                                    <td className="p-2">{formataTelefone(funcionario.telefone)}</td>
                                    <td className="p-2"><span className='bg-secondary-light px-2 py-1 rounded-full text-secondary-dark'>{cargos.find(cargo => cargo.id === funcionario.cargo_id)?.name || 'Não informado'}</span></td>
                                    <td className="p-2">{funcionario.data_admissao}</td>
                                    <td className="p-2">
                                        <div className='flex justify-center items-center gap-1'>
                                            <Button onClick={() => toggleEstadoFuncionario(funcionario)} variant="link" className={funcionario.ativo ? 'text-red-500 bg-red-100' : 'text-green-500 bg-green-100'}>
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
                    {funcionariosFiltrados.length === 0 && (
                        <div className="text-xl text-center col-span-full mt-10">Nenhum funcionário encontrado</div>
                    )}
                </div>
                
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
