import React from "react";
import { Button } from "../ui/button";
import { LuPencil, LuTrash } from "react-icons/lu";
import { formataMoeda } from "@/Utils/moeda";

export default function CardEmbalagem({embalagem, onEditar, onExcluir}) {

    return(
        <div key={embalagem.id} className="rounded-xl bg-white col-span-1 border-t-4 border-secondary p-4 shadow-sm transition-all hover:scale-105 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                    {embalagem.name}
                </h2>
                <div className="bg-gray-100 flex items-center justify-center p-1 rounded-sm text-sm text-secondary-foreground">
                    #{embalagem.id}
                </div>
            </div>
            <div className="text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-secondary-foreground">Máx. sabores:</span>
                    <span className="font-semibold">{embalagem.maximo_sabores}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-secondary-foreground">Valor base:</span>
                    <span className="font-semibold">{formataMoeda(embalagem.valor_base)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-secondary-foreground">Sabor extra:</span>
                    <span className="font-semibold">{formataMoeda(embalagem.preco_sabor_extra)}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <Button className="flex flex-1 items-center" variant='outline' onClick={onEditar}>
                    <LuPencil/>
                    Editar
                </Button>
                <Button onClick={onExcluir}>
                    <LuTrash/>
                </Button>
            </div>
        </div>
    )

}