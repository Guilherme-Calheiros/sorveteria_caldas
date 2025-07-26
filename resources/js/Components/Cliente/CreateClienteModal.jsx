import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Button } from '../ui/button';

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
                        <input
                            type="text"
                            value={data.name}
                            placeholder="Nome"
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={data.cpf}
                            placeholder="CPF"
                            onChange={(e) => setData('cpf', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.cpf && (
                            <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="submit"
                            disabled={processing}
                            variant="secondary"
                        >
                            {processing ? 'Salvando...' : 'Adicionar Cliente'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
