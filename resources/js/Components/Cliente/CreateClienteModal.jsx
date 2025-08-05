import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';

axios.defaults.withCredentials = true;

export default function CreateClienteModal({ show, onClose, onClienteCriado }) {
    const { data, setData, processing, errors, reset } = useForm({
        name: '',
        cpf: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post(route('clientes.store'), data);
            onClienteCriado(response.data);
            reset();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md" disableOutsideClick={true}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Cliente</h2>
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
                            value={data.cpf}
                            placeholder="CPF"
                            onChange={(e) => setData('cpf', e.target.value)}
                        />
                        {errors.cpf && (
                            <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Salvando...' : 'Adicionar Cliente'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
