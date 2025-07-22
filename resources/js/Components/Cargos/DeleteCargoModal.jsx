import Modal from '@/Components/Modal';
import { useForm} from '@inertiajs/react';
import { Button } from '../ui/button';


export default function DeleteCargoModal({ show, onClose, cargo }) {

    const { delete: destroy, processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route('cargos.destroy', cargo.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Excluir cargo</h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja exluir o cargo "{cargo?.name}"
                </p>
                <form onSubmit={handleSubmit} className="flex justify-end space-x-2">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        variant="destructive"
                    >
                        {processing ? 'Excluindo...' : 'Excluir cargo'}
                    </Button>
                </form>
            </div>
        </Modal>
    );
}
