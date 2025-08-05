import Modal from '@/Components/Modal';
import { useForm} from '@inertiajs/react';
import ModalButtons from '../ModalButtons';


export default function DeleteUserModal({ show, onClose, user }) {

    const { delete: destroy, patch,processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user?.ativo === true){
            destroy(route('usuarios.destroy', user.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            patch(route('usuarios.reativar', user.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{user?.ativo === true ? 'Desativar' : 'Reativar'} funcionário</h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja {user?.ativo === true ? 'desativar' : 'reativar'} o funcionário "{user?.name}"
                </p>
                <form onSubmit={handleSubmit} className="flex justify-end space-x-2">
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar={
                            processing
                                ? user?.ativo ? 'Desativando...' : 'Reativando...'
                                : user?.ativo ? 'Desativar funcionário' : 'Reativar funcionário'
                        }
                        variantConfirmar="destructive"
                    />
                </form>
            </div>
        </Modal>
    );
}
