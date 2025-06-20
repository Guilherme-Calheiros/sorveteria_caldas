import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function CreateClienteModal({ show, onClose, onClienteCriado }) {
    const { data, setData, processing, errors, reset } = useForm({
        name: '',
        cpf: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {processing ? 'Salvando...' : 'Adicionar Cliente'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
