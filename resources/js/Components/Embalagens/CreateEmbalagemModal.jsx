import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import InputMoney from '../InputMoney';
import ModalButtons from '../ModalButtons';
import TextInput from '../TextInput';
import { Input } from '../ui/input';

export default function CreateEembalagemModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        maximo_sabores: '',
        preco_sabor_extra: '',
        valor_base: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('embalagens.store'), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar nova embalagem</h2>
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
                        <Input
                            inputMode="numeric"
                            placeholder="Número máximo de sabores"
                            value={data.maximo_sabores}
                            onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.length > 1) val = val.slice(0, 1);
                                setData('maximo_sabores', val);
                            }}
                        />
                        {errors.maximo_sabores && <p className="text-red-500 text-sm mt-1">{errors.maximo_sabores}</p>}
                    </div>
                    <div>
                        <InputMoney
                            value={data.preco_sabor_extra}
                            onChange={(value) => setData('preco_sabor_extra', value)}
                            placeholder='Preço por sabor adicional'
                        />
                        {errors.preco_sabor_extra && <p className="text-red-500 text-sm mt-1">{errors.preco_sabor_extra}</p>}
                    </div>
                    <div>
                        <InputMoney
                            value={data.valor_base}
                            onChange={(value) => setData('valor_base', value)}
                            placeholder='Preço da embalagem'
                        />
                        {errors.valor_base && <p className="text-red-500 text-sm mt-1">{errors.valor_base}</p>}
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Criar Embalagem'
                    />
                </form>
            </div>
        </Modal>
    );
}
