import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import ModalButtons from '../ModalButtons';
import TextInput from '../TextInput';

export default function UpdateSaborModal({ show, onClose, sabor }) {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: sabor ? sabor.name : '',
    });

    useEffect(() => {
        if (sabor) {
            setData({ name: sabor.name });
        }
    }, [show, sabor]);

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
                        <TextInput
                            value={data.name}
                            placeholder="Nome"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Editar Sabor'
                    />
                </form>
            </div>
        </Modal>
    );
}
