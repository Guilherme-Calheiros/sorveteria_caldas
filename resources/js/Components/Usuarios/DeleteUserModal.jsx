import Modal from '@/Components/Modal';
import { useForm} from '@inertiajs/react';


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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{user?.ativo === true ? 'Desativar Usuário' : 'Reativar Usuário'}</h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja {user?.ativo === true ? 'desativar o usuário: ' : 'reativar o usuário: '} "{user?.name}"
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
                        {processing
                            ? user?.ativo ? 'Desativando...' : 'Reativando...'
                            : user?.ativo ? 'Desativar usuário' : 'Reativar usuário'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}
