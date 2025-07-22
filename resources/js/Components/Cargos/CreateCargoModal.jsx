import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Button } from '../ui/button';

export default function CreateCargoModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissao: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cargos.store'), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar novo cargo</h2>
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
                        <select
                            value={data.permissao}
                            onChange={(e) => setData('permissao', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="acesso_total">Acesso Total</option>
                            <option value="acesso_limitado">Acesso Limitado</option>
                        </select>
                        {errors.permissao && (
                            <p className="text-red-500 text-sm mt-1">{errors.permissao}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={processing}
                        >
                            {processing ? 'Salvando...' : 'Criar Cargo'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
