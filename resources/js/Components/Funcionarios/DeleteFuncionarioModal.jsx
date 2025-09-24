import Modal from '@/Components/Modal';
import { useForm} from '@inertiajs/react';
import ModalButtons from '../ModalButtons';


export default function DeleteFuncionarioModal({ show, onClose, funcionario }) {

    const { delete: destroy, patch,processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if(funcionario?.ativo === true){
            destroy(route('funcionarios.destroy', funcionario.id), {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            patch(route('funcionarios.reativar', funcionario.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{funcionario?.ativo === true ? 'Desativar' : 'Reativar'} funcionário</h2>
                <p className="text-gray-700 mb-6">
                    Tem certeza que deseja {funcionario?.ativo === true ? 'desativar' : 'reativar'} o funcionário "{funcionario?.name}"
                </p>
                <form onSubmit={handleSubmit} className="flex justify-end space-x-2">
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar={
                            processing
                                ? funcionario?.ativo ? 'Desativando...' : 'Reativando...'
                                : funcionario?.ativo ? 'Desativar funcionário' : 'Reativar funcionário'
                        }
                        variantConfirmar="destructive"
                    />
                </form>
            </div>
        </Modal>
    );
}
