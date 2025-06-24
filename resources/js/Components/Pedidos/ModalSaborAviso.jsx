import Modal from '@/Components/Modal';
import { formataMoeda } from '@/Utils/moeda';

export default function ModalAvisoSabor({ show, onConfirm, onClose, precoSaborExtra}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Sabor extra</h2>
                <p className="text-gray-700">Você atingiu o limite de sabores permitidos. Deseja adicionar um sabor extra com custo adicional de {formataMoeda(precoSaborExtra)}?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Adicionar mesmo assim
                    </button>
                </div>
            </div>
        </Modal>
    );
}
