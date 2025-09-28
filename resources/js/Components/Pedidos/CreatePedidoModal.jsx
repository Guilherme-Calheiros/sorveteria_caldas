import React, { useEffect, useMemo } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { formataMoeda } from "@/Utils/moeda";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "../Modal";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { LuPlus, LuTrash, LuX } from "react-icons/lu";
import { Button } from "@headlessui/react";
import ModalButtons from "../ModalButtons";

export default function CreatePedidoModal({ show, onClose, sabores, embalagens, funcionarios}){
    const [itens, setItens] = useState([]);
    const [quantidade, setQuantidade] = useState(1);
    const [showSaborExtra, setShowSaborExtra] = useState(false);
    const [selectedSabor, setSelectedSabor] = useState([]);
    const [selectedSabores, setSelectedSabores] = useState([])
    const [selectedEmbalagem, setSelectedEmbalagem] = useState(null);

    const {user} = usePage().props.auth;

    const { data, setData, post, errors, reset } = useForm({
        user_id: user.id,
        funcionario_id: '',
        cliente_nome: '',
        observacao: '',
        itens: []
    })

    const filteredSabores = useMemo(() => {
        const selectedIds = selectedSabores.map(s => s.id);
        return sabores.filter(s => !selectedIds.includes(s.id) && s.disponivel === true);
    }, [sabores, selectedSabores])

    const totalPedido = useMemo(() => {
        return itens.reduce((acc, item) => acc + (item.preco_total || 0), 0)
    }, [itens])

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('pedidos.store'), {
            onSuccess: () => {
                console.log('sucesso')
                reset();
                resetFormulario();
                onClose();
            },
        });
    };

    useEffect(() => {
        setData('itens', itens);
    }, [itens]);

    const resetFormulario = () => {
        setItens([]);
        setQuantidade(1);
        setShowSaborExtra(false);
        setSelectedSabor(null);
        setSelectedSabores([]);
        setSelectedEmbalagem(null);
    };

    const handleAddSabor = () => {
        if (!selectedSabor || selectedSabores.includes(selectedSabor)) return;

        if (selectedSabores.length >= selectedEmbalagem.maximo_sabores) {
            setShowSaborExtra(true)
        } else {
            setSelectedSabores([...selectedSabores, selectedSabor]);
            setSelectedSabor([]);
        }

    };

    const handleAddSaborExtra = () => {
        setSelectedSabores([...selectedSabores, selectedSabor]);
        setSelectedSabor([]);
        setShowSaborExtra(false);
    }

    const handleCancelSaborExtra = () => {
        setSelectedSabor([]);
        setShowSaborExtra(false);
    }

    const handleRemoveSabor = (sabor) => {
        setSelectedSabores(selectedSabores.filter(item => item.id !== sabor.id));
    };

    const handleAddItem = () => {
        if (!selectedEmbalagem || quantidade < 1 ) return;

        const numExtras = Math.max(0, selectedSabores.length - selectedEmbalagem.maximo_sabores);
        const precoUnitario = parseFloat(selectedEmbalagem.valor_base) + (numExtras * parseFloat(selectedEmbalagem.preco_sabor_extra));

        const item = {
            embalagem_id: parseInt(selectedEmbalagem.id),
            quantidade: parseInt(quantidade),
            sabores: selectedSabores.map(s => s.id),
            preco_unitario: precoUnitario,
            preco_total: precoUnitario * quantidade,
        }

        setItens([...itens, item])
        setSelectedEmbalagem([])
        setSelectedSabores([])
        setQuantidade(1)

    };

    const handleEditItem = (index) => {
        const item = itens[index]
        setSelectedEmbalagem(embalagens.find(e => e.id === Number(item.embalagem_id)));
        setSelectedSabores(item.sabores.map(s => sabores.find(e => e.id === Number(s))));
        handleRemoveItem(index)
    }

    const handleRemoveItem = (index) => {
        setItens(itens.filter((_, i) => i !== index))
    }

    const handleCancel = () => {
        onClose();
    }

    return(
        <Modal show={show} onClose={onClose} disableOutsideClick={true}>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
                <div className="p-2 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Criar Pedido</h1>
                    <Button
                        onClick={handleCancel}
                        variant="icon"
                    >
                        <LuX/>
                    </Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <h2 className="text-lg font-bold col-span-full">Dados do Pedido</h2>
                        <div className="col-span-1">
                            <InputLabel value="Funcionário" htmlFor="funcionario" className="obrigatorio"/>
                            <Select
                                id="funcionario"
                                onValueChange={(id) => {
                                    const funcionario = funcionarios.find(e => e.id === Number(id));
                                    setData('funcionario_id', funcionario.id);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Escolha o funcionário responsável pelo pedido" />
                                </SelectTrigger>
                                <SelectContent>
                                    {funcionarios.map(e => (
                                        <SelectItem key={e.id} value={e.id.toString()}>
                                            {e.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-1">
                            <InputLabel value="Nome do Cliente (Opcional)" htmlFor="cliente_nome"/>
                            <TextInput
                                id="cliente_nome"
                                value={data.cliente_nome}
                                placeholder="Nome do cliente"
                                onChange={(e) => setData('cliente_nome', e.target.value)}
                            />
                        </div>
                        <div className="col-span-full">
                            <InputLabel value="Observação (Opcional)" htmlFor="observacao"/>
                            <textarea
                                id="observacao"
                                value={data.observacao}
                                placeholder="Observações sobre o pedido..."
                                onChange={e => setData('observacao', e.target.value)}
                                className="text-sm border-input bg-transparent mt-1 block w-full border rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring"
                            />
                            {errors.observacao && <p className="text-red-500 text-sm">{errors.observacao}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <h2 className="text-lg font-bold">Itens do Pedido</h2>
                        <div className="p-2 rounded bg-neutral-50 border col-span-full">
                            <h3 className="text-secondary-foreground">Adicionar Item</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="md:col-span-3">
                                    <InputLabel value="Embalagem" htmlFor="embalagem"/>
                                    <Select
                                        id="embalagem"
                                        value={selectedEmbalagem?.id?.toString() ?? ''}
                                        onValueChange={(id) => {
                                            const embalagem = embalagens.find(e => e.id === Number(id));
                                            setSelectedEmbalagem(embalagem);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a Embalagem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {embalagens.map(e => (
                                                <SelectItem key={e.id} value={e.id.toString()}>
                                                    {e.name} - {formataMoeda(e.valor_base)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-1">
                                    <InputLabel value="Quantidade" htmlFor="quantidade"/>
                                    <Input
                                        id="quantidade"
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
                                {selectedEmbalagem && selectedEmbalagem.maximo_sabores > 0 &&(
                                    <div className="col-span-full">
                                        <p className="text-sm text-gray-600">
                                            Escolha até <strong>{selectedEmbalagem.maximo_sabores}</strong> {selectedEmbalagem.maximo_sabores === 1 ? 'sabor' : 'sabores'} sem custo adicional.
                                        </p>
                                        {showSaborExtra && (
                                            <div className="bg-secondary-light rounded border border-secondary p-2">
                                                <h3 className="text-foreground font-bold">Confirmar sabor extra</h3>
                                                <p className="text-sm">Deseja adicionar o sabor <strong>{selectedSabor.name}</strong>?</p>
                                                <p className="text-sm">Cada sabor extra tem acréscimo de <strong>{formataMoeda(selectedEmbalagem.preco_sabor_extra)}</strong></p>
                                                <ModalButtons
                                                    onCancelar={handleCancelSaborExtra}
                                                    onConfirmar={handleAddSaborExtra}
                                                    textoConfirmar="Adicionar"
                                                    processing={false}
                                                    tipoConfirmar="button"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {selectedEmbalagem && Object.keys(selectedEmbalagem).length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                                    <div className="col-span-5">
                                        <Select
                                            value={selectedSabor?.id?.toString() ?? ""}
                                            onValueChange={(id) => {
                                                const sabor = sabores.find(s => s.id === Number(id));
                                                setSelectedSabor(sabor);
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione um sabor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredSabores.map(s => (
                                                    <SelectItem key={s.id} value={s.id.toString()}>
                                                        {s.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <PrimaryButton
                                        className='col-span-1'
                                        onClick={() => {
                                            handleAddSabor();
                                        }}
                                        disabled={selectedSabor.length === 0 || !selectedEmbalagem}
                                    >
                                        <LuPlus />
                                    </PrimaryButton>

                                    <ul className="col-span-full flex items-center gap-2 flex-wrap">
                                        {selectedSabores && Object.keys(selectedSabores).length > 0 && (
                                            selectedSabores.map(sabor => (
                                                <li key={sabor.id} className="bg-secondary-light text-sm px-2 py-1 rounded-full text-secondary-dark flex items-center gap-1">
                                                    {sabor?.name}
                                                    <Button
                                                        onClick={() => handleRemoveSabor(sabor)}
                                                        variant="icon"
                                                    >
                                                        <LuX />
                                                    </Button>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                    <PrimaryButton
                                        className="col-span-full"
                                        disabled={selectedSabores.length === 0 || !selectedEmbalagem}
                                        type='button'
                                        onClick={() => handleAddItem()}
                                    >
                                        Adicionar item ao pedido
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                        <div>
                            <ul className="mt-4 space-y-2">
                                {itens?.map((item, index) => {
                                    const embalagem = embalagens.find(e => e.id === item.embalagem_id);
                                    const saboresDoItem = sabores.filter(s => item.sabores.includes(s.id));

                                    return (
                                        <div
                                            key={index}
                                            className="border p-3 rounded-lg bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium">
                                                    {embalagem?.name} × {item.quantidade}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {saboresDoItem.map(s => s.name).join(', ')}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm">
                                                    <div className="font-medium">Total: {formataMoeda(item.preco_total)}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(index)}
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                    >
                                                        <LuTrash />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                        <p className="mt-4 font-bold text-right">
                            Total do Pedido: {
                                formataMoeda(totalPedido)
                            }
                        </p>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <PrimaryButton
                            type="submit"
                            disabled={!data.funcionario_id || itens.length === 0}
                        >
                            Criar Pedido
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}