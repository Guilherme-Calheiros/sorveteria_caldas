import React from "react";
import { Button } from "../ui/button";
import { LuPencil, LuTrash } from "react-icons/lu";

export default function CardSabor({sabor, onToggleEstado, onEditar, onExcluir}) {

    return(
        <div key={sabor.id} className="rounded-xl bg-white col-span-1 border-t-4 p-4 shadow-sm transition-all hover:scale-105" style={{ borderTop: `6px solid ${sabor.color}` }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                    <h2 className="text-lg font-bold">
                        {sabor.name}
                    </h2>
                    <div
                        className={`px-2 py-1 rounded-md text-sm
                            ${sabor.disponivel 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"}`}
                        >
                        {sabor.disponivel ? "Disponível" : "Indisponível"}
                    </div>
                </div>
                <div className="bg-gray-100 flex items-center justify-center p-1 rounded-sm text-sm text-secondary-foreground">
                    #{sabor.id}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button className="flex-1" onClick={onToggleEstado}>
                    {sabor.disponivel === true ? 'Desativar' : 'Ativar'}
                </Button>
                <Button variant='outline' onClick={onEditar}>
                    <LuPencil/>
                </Button>
                <Button variant='outline' onClick={onExcluir}>
                    <LuTrash/>
                </Button>
            </div>
        </div>
    )

}