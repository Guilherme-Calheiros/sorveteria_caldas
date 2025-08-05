import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputTelefone from '../InputTelefone';
import InputEmail from '../InputEmail';
import { desformataTelefone } from '@/Utils/telefone';
import ModalButtons from '../ModalButtons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TextInput from '../TextInput';

export default function CreateUserModal({ show, onClose, cargos }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        telefone: '',
        cargo_id: '',
    });

    useEffect(() => {
        if (show) {
          reset();
        }
      }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('usuarios.store'), {
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
        <Modal show={show} onClose={onClose} maxWidth="md" disableOutsideClick={true}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar novo Funcionário</h2>
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
                        <InputEmail
                            value={data.email}
                            onChange={(value) => setData('email', value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <InputTelefone
                            value={data.telefone}
                            onChange={(value) => setData('telefone', desformataTelefone(value))}
                        />                      
                        {errors.telefone && (
                            <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                        )}
                    </div>
                    <div>
                        <Select onValueChange={(value) => setData('cargo_id', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                {cargos.map((cargo) => (
                                    <SelectItem key={cargo.id} value={cargo.id}>{cargo.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.cargo_id && <p className="text-red-500">{errors.cargo_id}</p>}
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Criar Funcionário'
                    />
                </form>
            </div>
        </Modal>
    );
}
