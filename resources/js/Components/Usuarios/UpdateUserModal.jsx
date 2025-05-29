import InputMask from 'react-input-mask';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UpdateUserModal({ show, onClose, cargos, user }) {
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user ? user.name : '',
        email: user ? user.email : '',
        telefone: user ? user.telefone : '',
        cargo_id: user ? user.cargo_id : '',
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                email: user.email || '',
                telefone: user.telefone || '',
                cargo_id: user.cargo_id || '',
            });
        }
    }, [user, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('usuarios.update', user.id), {
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
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Editar usuário</h2>
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
                            value={data.email}
                            placeholder="Email"
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <InputMask
                        mask="(99) 99999-9999"
                        value={data.telefone}
                        onChange={(e) => setData('telefone', e.target.value)}
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                type="text"
                                placeholder="Telefone"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        )}
                    </InputMask>
                    <div>
                        <select
                            value={data.cargo_id}
                            onChange={(e) => setData('cargo_id', e.target.value)}
                            >
                            <option value="">Selecione um cargo</option>
                            {cargos.map((cargo) => (
                                <option key={cargo.id} value={cargo.id}>
                                {cargo.name}
                                </option>
                            ))}
                        </select>
                        {errors.cargo_id && <p className="text-red-500">{errors.cargo_id}</p>}
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
                            {processing ? 'Salvando...' : 'Editar Usuário'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
