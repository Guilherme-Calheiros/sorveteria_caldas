import { formataMoeda } from "@/Utils/moeda";
import React from "react";
import { LuClock, LuMessageSquare, LuUser } from "react-icons/lu";

export default function CardPedido({pedido}) {
    
    return(
        <div key={pedido.id} className="rounded-xl bg-white col-span-1 shadow-sm border hover:shadow-lg transition-all flex flex-col gap-3r">
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg">
                    {pedido.cliente_nome ? `Pedido de ${pedido.cliente_nome}` : `Pedido #${pedido.id}`}
                </h3>
                <div className="flex flex-wrap items-center justify-between">
                    <p className="flex items-center gap-1 text-secondary-foreground">
                        <LuUser/>
                        {pedido.funcionario.name}
                    </p>
                    <p className="flex items-center gap-1 text-secondary-foreground">
                        <LuClock/>
                        {new Date(pedido.data_pedido).toLocaleDateString()} - {new Date(pedido.data_pedido).toLocaleTimeString().slice(0, 5)}
                    </p>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                {pedido.itens_pedido.map((item, index) => (
                        <div key={item.id} className={'flex items-start gap-2 p-4 bg-gray-50 border shadow-sm rounded-lg'}>
                            <div className="bg-primary text-primary-foreground text-xs font-bold rounded-md h-6 w-6 flex items-center justify-center flex-shrink-0">
                                {item.quantidade}x
                            </div>                            
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 mb-2">{item.embalagem.name}</p>
                                {item.sabores && item.sabores.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {item.sabores.map((sabor) => (
                                            <span key={sabor.id} className="bg-secondary-light text-xs text-secondary-dark rounded-full px-3 py-1 font-medium">
                                                {sabor.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-semibold">
                                    {formataMoeda(item.valor_unitario * item.quantidade)}
                                </p>
                                {item.quantidade > 1 && (
                                    <p className="text-xs text-secondary-foreground">
                                        {formataMoeda(item.valor_unitario)} cada
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
            <div className="p-4 mt-auto flex flex-col gap-4">
                {pedido.observacao && (
                    <div className="border border-secondary-dark p-4 rounded">
                        <h4 className="font-bold text-foreground flex items-center gap-1">
                            <LuMessageSquare/>
                            Observação do pedido
                        </h4>
                        <p className="text-sm">
                            {pedido.observacao}
                        </p>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <p className="font-bold text-secondary-foreground">
                        Total do Pedido: 
                    </p>
                    <p className="font-bold text-xl text-secondary-dark">
                        {formataMoeda(pedido.total)}
                    </p>
                </div>
            </div>
        </div>
    )
}