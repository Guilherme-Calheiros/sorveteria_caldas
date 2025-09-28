import React from "react";
import { Button } from "../ui/button";

export default function CardSabor({sabor, onEditar, onExcluir}) {

    return(
        <div key={sabor.id} className="rounded-xl bg-white col-span-1 border-t-4 border-secondary p-4 shadow-sm transition-all hover:scale-105">
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
            <div className="grid grid-cols-2 gap-4">
                <Button variant='outline' onClick={onEditar}>
                    Editar
                </Button>
                <Button onClick={onExcluir}>
                    {sabor.disponivel === true ? 'Desativar' : 'Ativar'}
                </Button>
            </div>
        </div>
    )

}