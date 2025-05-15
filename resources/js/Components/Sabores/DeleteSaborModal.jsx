import Modal from '@/Components/Modal';
import { useForm} from '@inertiajs/react';


export default function DeleteSaborModal({ show, onClose, sabor }) {

    const { delete: destroy, processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route('sabores.destroy', sabor.id), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Excluir sabor</h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja exluir o sabor "{sabor?.name}"
                </p>
                <form onSubmit={handleSubmit} className="flex justify-end space-x-2">
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
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        {processing ? 'Excluindo...' : 'Excluir Sabor'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}
