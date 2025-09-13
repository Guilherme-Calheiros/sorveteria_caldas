import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputTelefone from '../InputTelefone';
import ModalButtons from '../ModalButtons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TextInput from '../TextInput';
import { formataCpf } from '@/Utils/cpf';

export default function UpdateFuncionarioModal({ show, onClose, cargos, funcionario }) {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: funcionario ? funcionario.name : '',
        cpf: funcionario ? funcionario.cpf : '',
        telefone: funcionario ? funcionario.telefone : '',
        cargo_id: funcionario ? funcionario.cargo_id : '',
    });

    useEffect(() => {
        if (funcionario) {
            setData({
                name: funcionario.name || '',
                cpf: funcionario.cpf || '',
                telefone: funcionario.telefone || '',
                cargo_id: funcionario.cargo_id || '',
            });
        }
    }, [funcionario, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('funcionarios.update', funcionario.id), {
            data: data,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Editar Funcionário</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <TextInput
                            value={data.name}
                            placeholder="Nome"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <TextInput
                            value={formataCpf(data.cpf)}
                            maxLength={14}
                            placeholder="CPF"
                            onChange={(e) => setData('cpf', e.target.value)}
                        />
                        {errors.cpf && (
                            <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
                        )}
                    </div>
                    <div>
                        <InputTelefone
                            value={data.telefone}
                            onChange={(value) => setData('telefone', value)}
                        />
                        {errors.telefone && (
                            <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                        )}
                    </div>
                    <div>
                        <Select 
                            value={String(data.cargo_id)}
                            onValueChange={(value) => setData('cargo_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                {cargos.map((cargo) => (
                                <SelectItem key={cargo.id} value={String(cargo.id)}>
                                    {cargo.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.cargo_id && <p className="text-red-500">{errors.cargo_id}</p>}
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Editar Funcionário'
                    />
                </form>
            </div>
        </Modal>
    );
}
