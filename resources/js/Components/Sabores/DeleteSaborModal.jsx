import Modal from '@/Components/Modal';
import { useForm} from '@inertiajs/react';
import ModalButtons from '../ModalButtons';


export default function DeleteSaborModal({ show, onClose, sabor }) {

    const { delete: destroy, patch,processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(sabor?.disponivel === true){
            destroy(route('sabores.destroy', sabor.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            patch(route('sabores.reativar', sabor.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{sabor?.disponivel === true ? 'Desativar' : 'Ativar'} sabor</h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja {sabor?.disponivel === true ? 'desativar' : 'ativar'} o sabor "{sabor?.name}"
                </p>
                <form onSubmit={handleSubmit} className="flex justify-end space-x-2">
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar={
                            processing
                                ? sabor?.disponivel ? 'Desativando...' : 'Reativando...'
                                : sabor?.disponivel ? 'Desativar sabor' : 'Ativar sabor'
                        }
                        variantConfirmar="destructive"
                    />
                </form>
            </div>
        </Modal>
    );
}
