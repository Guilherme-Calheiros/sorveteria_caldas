import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputTelefone from '../InputTelefone';
import InputEmail from '../InputEmail';
import ModalButtons from '../ModalButtons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TextInput from '../TextInput';

export default function UpdateUserModal({ show, onClose, cargos, user }) {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user ? user.name : '',
        email: user ? user.email : '',
        telefone: user ? user.telefone : '',
        cargo_id: user ? user.cargo_id : '',
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                email: user.email || '',
                telefone: user.telefone || '',
                cargo_id: user.cargo_id || '',
            });
        }
    }, [user, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('usuarios.update', user.id), {
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
                            onChange={(value) => setData('telefone', value)}
                        />
                        {errors.telefone && (
                            <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                        )}
                    </div>
                    <div>
                        <Select onValueChange={(value) => setData('cargo_id', value)} value={data.cargo_id}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um cargo">
                                    {cargos.find(c => String(c.id) === String(data.cargo_id))?.name}
                                </SelectValue>
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
                        textoConfirmar='Editar Funcionário'
                    />
                </form>
            </div>
        </Modal>
    );
}
