import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import ModalButtons from '../ModalButtons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TextInput from '../TextInput';

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
        <Modal show={show} onClose={onClose} maxWidth="md" disableOutsideClick={true}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar novo cargo</h2>
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
                    <div>
                        <Select onValueChange={(value) => setData('permissao', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="acesso_total">Acesso Total</SelectItem>
                                <SelectItem value="acesso_limitado">Acesso Limitado</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.permissao && (
                            <p className="text-red-500 text-sm mt-1">{errors.permissao}</p>
                        )}
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Criar Cargo'
                    />
                </form>
            </div>
        </Modal>
    );
}
