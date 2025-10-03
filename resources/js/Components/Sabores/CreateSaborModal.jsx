import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import ModalButtons from '../ModalButtons';
import TextInput from '../TextInput';
import InputLabel from '../InputLabel';

export default function CreateSaborModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: '#ffffff'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sabores.store'), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar novo sabor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputLabel value="Nome" htmlFor="nome"/>
                        <TextInput
                            id="nome"
                            value={data.name}
                            placeholder="Nome"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <InputLabel value="Cor do card" htmlFor="card_color"/>
                        <input type="color" value={data.color} id="card_color" onChange={(e) => setData('color', e.target.value)}/>
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Criar Sabor'
                    />
                </form>
            </div>
        </Modal>
    );
}
