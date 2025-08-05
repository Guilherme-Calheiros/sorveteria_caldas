import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import ModalAvisoSabor from "./ModalSaborAviso";
import { LuPlus } from "react-icons/lu";
import { Button } from "../ui/button";
import PrimaryButton from "../PrimaryButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ModalButtons from "../ModalButtons";
import { Input } from "../ui/input";

export default function CreateItemPedidoModal({ show, onClose, onItemAdd, sabores = [], embalagens = [] }) {
    const [embalagemId, setEmbalagemId] = useState('');
    const [selectedEmbalagem, setSelectedEmbalagem] = useState({});
    const [quantidade, setQuantidade] = useState(1);
    const [maximoSabores, setMaximoSabores] = useState(0);
    const [saborExtra, setSaborExtra] = useState('');
    const [selectedSabores, setSelectedSabores] = useState([]);
    const [selectedSabor, setSelectedSabor] = useState('');
    const [showModalSaborAviso, setShowModalSaborAviso] = useState(false);


    useEffect(() => {
        const embalagem = embalagens.find(e => e.id === parseInt(embalagemId));
        setSelectedEmbalagem(embalagem || {});
        setMaximoSabores(embalagem?.maximo_sabores || 0);
    }, [embalagemId, embalagens]);


    const handleAddSabor = () => {
        if (!selectedSabor || selectedSabores.includes(selectedSabor)) return;

        if (selectedSabores.length >= maximoSabores) {
            setSaborExtra(selectedSabor)
            setShowModalSaborAviso(true);
        } else {
            setSelectedSabores([...selectedSabores, selectedSabor]);
            setSelectedSabor('');
        }

    };

    
    const confirmarAdicionarExtra = () => {
        setSelectedSabores([...selectedSabores, saborExtra]);
        setSelectedSabor('');
        setSaborExtra('');
        setShowModalSaborAviso(false);
    };

    const cancelarAdicionarExtra = () => {
        setSaborExtra('');
        setShowModalSaborAviso(false);
    };

    const handleAddItem = () => {
        if (!embalagemId || quantidade < 1 || selectedSabores.length < maximoSabores) return;

        const embalagem = embalagens.find(e => e.id === parseInt(embalagemId));
        const precoBase = embalagem?.valor_base || 0;
        const precoSaborExtra = embalagem?.preco_sabor_extra || 0;
        const numExtras = Math.max(0, selectedSabores.length - embalagem.maximo_sabores);
        const precoUnitario = precoBase + (numExtras * precoSaborExtra);
        const precoTotal = precoUnitario * quantidade;

        const saboresSelecionados = selectedSabores.map(id => parseInt(id));
        const saboresNomes = saboresSelecionados.map(id => {
            const sabor = sabores.find(s => s.id === id);
            return sabor?.name || `Sabor ${id}`;
        });


        onItemAdd({
            embalagem_id: parseInt(embalagemId),
            quantidade: parseInt(quantidade),
            sabores: saboresSelecionados,
            embalagem_nome: embalagem?.name || '',
            sabores_nomes: saboresNomes,
            preco_unitario: precoUnitario,
            preco_total: precoTotal,
        });

        // Reset
        setEmbalagemId('');
        setQuantidade(1);
        setSelectedSabores([]);
        setSelectedSabor('');
        setShowModalSaborAviso(false);
        onClose();
    };

    const handleRemoveSabor = (saborId) => {
        setSelectedSabores(selectedSabores.filter(id => id !== saborId));
    };

    const handleCancel = () => {
        setEmbalagemId('');
        setSelectedEmbalagem({});
        setQuantidade(1);
        setMaximoSabores(0);
        setSaborExtra('');
        setSelectedSabores([]);
        setSelectedSabor('');
        setShowModalSaborAviso(false);
        onClose();
    };

    const selectedIds = selectedSabores.map(id => Number(id));
    const filteredSabores = sabores.filter(s => !selectedIds.includes(s.id));

    return (
        <Modal show={show} onClose={onClose} maxWidth="md" disableOutsideClick={true}>
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Adicionar Item</h2>

                <div>
                    <Select 
                        onValueChange={(value) => {
                            setEmbalagemId(value);
                            setSelectedSabores([]);
                            setSelectedSabor('');
                        }}
                        value={embalagemId}  
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a Embalagem" />
                        </SelectTrigger>
                        <SelectContent>
                           {embalagens.map(e => (
                                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedEmbalagem && selectedEmbalagem.maximo_sabores > 0 &&(
                    <p className="text-sm text-gray-600">
                        Escolha até <strong>{maximoSabores}</strong> {maximoSabores === 1 ? 'sabor' : 'sabores'} sem custo adicional.
                    </p>
                )}

                <div>
                    <Input
                        type="number"
                        min={1}
                        max={10}
                        value={quantidade}
                        onChange={(e) => {
                            const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
                            setQuantidade(val > 0 ? val : 1);
                        }}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Select onValueChange={(value) => setSelectedSabor(value)} value={selectedSabor}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um sabor" />
                        </SelectTrigger>
                        <SelectContent>
                           {filteredSabores.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <PrimaryButton
                        onClick={handleAddSabor}
                        disabled={!selectedSabor || !embalagemId}
                    >
                        <LuPlus/>
                    </PrimaryButton>
                </div>

                <ul className="list-disc ml-6 space-y-1">
                    {selectedSabores.map(id => {
                        const sabor = sabores.find(s => s.id === parseInt(id));
                        return (
                            <li key={id} className="flex items-center justify-between">
                                {sabor?.name}
                                <Button
                                    onClick={() => handleRemoveSabor(id)}
                                    variant="link"
                                >
                                    Remover
                                </Button>
                            </li>
                        );
                    })}
                </ul>

                {showModalSaborAviso && (
                    <ModalAvisoSabor
                        show={showModalSaborAviso}
                        onClose={() => {
                            cancelarAdicionarExtra()
                        }}
                        onConfirm={confirmarAdicionarExtra}
                        precoSaborExtra={selectedEmbalagem.preco_sabor_extra}
                    />
                )}

                <div className="flex justify-end">
                    <ModalButtons
                        onCancelar={handleCancel}
                        onConfirmar={handleAddItem}
                        textoConfirmar="Adicionar"
                        processing={false}
                        tipoConfirmar="button"
                    />
                </div>
            </div>
        </Modal>
    );
}
