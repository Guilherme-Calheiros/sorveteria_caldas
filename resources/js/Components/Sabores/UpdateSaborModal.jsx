import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UpdateSaborModal({ show, onClose, sabor }) {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: sabor ? sabor.name : '',
    });

    useEffect(() => {
        if (sabor) {
            setData({ name: sabor.name });
        }
    }, [sabor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('sabores.update', sabor.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Editar sabor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            id="saborName"
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
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {processing ? 'Salvando...' : 'Editar Sabor'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
