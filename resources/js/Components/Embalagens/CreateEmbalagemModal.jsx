import NumberFormat from 'react-number-format';
import InputMask from 'react-input-mask';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

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
                        <InputMask
                            mask="99"
                            value={data.maximo_sabores}
                            onChange={(e) => setData('maximo_sabores', e.target.value)}
                            >
                            {(inputProps) => (
                                <input
                                {...inputProps}
                                type="text"
                                placeholder="Número máximo de sabores"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            )}
                        </InputMask>
                        {errors.maximo_sabores && <p className="text-red-500 text-sm mt-1">{errors.maximo_sabores}</p>}
                    </div>
                    <div>
                        <NumberFormat
                            value={data.preco_sabor_extra}
                            onValueChange={(values) => setData('preco_sabor_extra', values.floatValue)}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            prefix="R$ "
                            placeholder="Valor por sabor extra"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.preco_sabor_extra && <p className="text-red-500 text-sm mt-1">{errors.preco_sabor_extra}</p>}
                    </div>
                    <div>
                        <NumberFormat
                            value={data.valor_base}
                            onValueChange={(values) => setData('valor_base', values.floatValue)}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            prefix="R$ "
                            placeholder="Valor base"
                            className="w-full border border-gray-300 rounded px-3 py-2"
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
