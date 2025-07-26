import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import ModalButtons from '../ModalButtons';

export default function UpdateCargoModal({ show, onClose, cargo}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: cargo ? cargo.name : '',
        permissao: cargo ? cargo.permissao : '',
    });

    useEffect(() => {
        if (cargo){
            setData({ 
                name: cargo.name,
                permissao: cargo.permissao
            })
        }
    }, [cargo])

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('cargos.update', cargo.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Editar cargo</h2>
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
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Editar Cargo'
                    />
                </form>
            </div>
        </Modal>
    );
}
