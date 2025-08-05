import Modal from '@/Components/Modal';
import { formataMoeda } from '@/Utils/moeda';
import ModalButtons from '../ModalButtons';

export default function ModalAvisoSabor({ show, onConfirm, onClose, precoSaborExtra}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Sabor extra</h2>
                <p className="text-gray-700">Você atingiu o limite de sabores permitidos. Deseja adicionar um sabor extra com custo adicional de {formataMoeda(precoSaborExtra)}?</p>
                <ModalButtons
                    onCancelar={onClose}
                    onConfirmar={onConfirm}
                    tipoConfirmar="button"
                    textoConfirmar="Adicionar mesmo assim"
                />
            </div>
        </Modal>
    );
}
