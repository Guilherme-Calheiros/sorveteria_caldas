import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import InputMoney from '../InputMoney';
import { useEffect } from 'react';
import ModalButtons from '../ModalButtons';
import TextInput from '../TextInput';
import { Input } from '../ui/input';
import InputLabel from '../InputLabel';

export default function UpdateEembalagemModal({ show, onClose, embalagem}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: embalagem ? embalagem.name : '',
        maximo_sabores: embalagem ? embalagem.maximo_sabores : '',
        preco_sabor_extra: embalagem ? embalagem.preco_sabor_extra : '',
        valor_base: embalagem ? embalagem.valor_base : '',
    });

    useEffect(() => {
        if (embalagem) {
            setData({
                name: embalagem.name || '',
                maximo_sabores: embalagem.maximo_sabores || '',
                preco_sabor_extra: embalagem.preco_sabor_extra || '',
                valor_base: embalagem.valor_base || '',
            });
        }
    }, [embalagem, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('embalagens.update', embalagem.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Editar embalagem</h2>
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
                        <InputLabel value="Número máximo de sabores" htmlFor="max_sabores"/>
                        <Input
                            id="max_sabores"
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
                        <InputLabel value="Preço por sabor adicional" htmlFor="sabor_adicional"/>
                        <InputMoney
                            id="sabor_adicional"
                            value={data.preco_sabor_extra}
                            onChange={(value) => setData('preco_sabor_extra', value)}
                            placeholder='Preço por sabor adicional'
                        />
                        {errors.preco_sabor_extra && <p className="text-red-500 text-sm mt-1">{errors.preco_sabor_extra}</p>}
                    </div>
                    <div>
                        <InputLabel value="Preço da embalagem" htmlFor="preco_embalagem"/>
                        <InputMoney
                            id="preco_embalagem"
                            value={data.valor_base}
                            onChange={(value) => setData('valor_base', value)}
                            placeholder='Preço da embalagem'
                        />
                        {errors.valor_base && <p className="text-red-500 text-sm mt-1">{errors.valor_base}</p>}
                    </div>
                    <ModalButtons
                        onCancelar={handleCancel}
                        processing={processing}
                        textoConfirmar='Editar Embalagem'
                    />
                </form>
            </div>
        </Modal>
    );
}
