import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CreateClienteModal from "@/Components/Cliente/CreateClienteModal";
import CreateItemPedidoModal from "@/Components/Pedidos/CreateItemPedidoModal";
import { formataMoeda } from "@/Utils/moeda";

export default function Create({ sabores, embalagens}){
    const [showClienteModal, setShowClienteModal] = useState(true);
    const [showItemPedidoModal, setShowItemPedidoModal] = useState(false);
    const [itens, setItens] = useState([])
    const [cliente, setCliente] = useState([]);

    const {user} = usePage().props.auth;

    const { data, setData, post, processing, errors, reset } = useForm({
        cliente_id: '',
        funcionario_id: user ? user.id : null,
        observacao: '',
        itens: []
    })

    useEffect(() => {
        setData('cliente_id', cliente?.id || null);
    }, [cliente]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pedidos.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleClienteCriado = (cliente) => {
        setCliente(cliente)
    };

    const handleAddItem = (item) => {
        const {embalagem_id, quantidade, sabores} = item

        setData('itens', [...data.itens, {embalagem_id, quantidade, sabores}])

        setItens([...itens, item])

    };

    return(
        <div className="p-4 flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-4">Criar Pedido</h1>
            <p>{cliente?.name}</p>
            <p>{user?.name || 'Autoatendimento'}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Observação</label>
                    <textarea
                        value={data.observacao}
                        onChange={e => setData('observacao', e.target.value)}
                        className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                    {errors.observacao && <p className="text-red-500 text-sm">{errors.observacao}</p>}
                </div>
                <div>
                    <ul className="mt-4 space-y-2">
                        {itens?.map((item, index) => (
                            <li key={index} className="border p-2 rounded">
                                <p><strong>Embalagem:</strong> {item.embalagem_nome}</p>
                                <p><strong>Quantidade:</strong> {item.quantidade}</p>
                                <p><strong>Sabores:</strong> {item.sabores_nomes?.join(', ')}</p>
                                <p><strong>Preço Unitário:</strong>{formataMoeda(item.preco_unitario)}</p>
                                <p><strong>Total do Item:</strong>{formataMoeda(item.preco_total)}</p>
                            </li>
                        ))}
                        
                    </ul>
                    <p className="mt-4 font-bold text-right">
                        Total do Pedido: {
                            formataMoeda(itens.reduce((acc, item) => acc + (item.preco_total || 0), 0))
                        }
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowItemPedidoModal(true)}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Adicionar Item
                    </button>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {processing ? 'Salvando...' : 'Criar Pedido'}
                    </button>
                </div>
            </form>
            <CreateClienteModal
                show={showClienteModal}
                onClose={() => setShowClienteModal(false)}
                onClienteCriado={handleClienteCriado}
            />
            <CreateItemPedidoModal
                show={showItemPedidoModal}
                onClose={() => setShowItemPedidoModal(false)}
                onItemAdd={handleAddItem}
                sabores={sabores}
                embalagens={embalagens}
            />
        </div>
    )
}