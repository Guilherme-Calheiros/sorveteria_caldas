import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import InputMoney from '../InputMoney';

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
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Número máximo de sabores"
                            value={data.maximo_sabores}
                            onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.length > 2) val = val.slice(0, 2);
                                setData('maximo_sabores', val);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.maximo_sabores && <p className="text-red-500 text-sm mt-1">{errors.maximo_sabores}</p>}
                    </div>
                    <div>
                        <InputMoney
                            value={data.preco_sabor_extra}
                            onChange={(e) => setData('preco_sabor_extra', e.target.value)}
                            placeholder='Preço por sabor adicional'
                        />
                        {errors.preco_sabor_extra && <p className="text-red-500 text-sm mt-1">{errors.preco_sabor_extra}</p>}
                    </div>
                    <div>
                        <InputMoney
                            value={data.valor_base}
                            onChange={(e) => setData('valor_base', e.target.value)}
                            placeholder='Preço da embalagem'
                        />
                        {errors.valor_base && <p className="text-red-500 text-sm mt-1">{errors.valor_base}</p>}
                    </div>
                    <div className="flex justify-end space-x-2">
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
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {processing ? 'Salvando...' : 'Criar Embalagem'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
