import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "./ui/button";
import Modal from "./Modal";

export default function DeleteModal({show, onClose, element, routeName, label, message}){
    const {delete: destroy, processing} = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route(routeName, element.id), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleCancel = () => {
        onClose();
    }

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Excluir {label}</h2>
                <p className="text-gray-700 mb-6">
                    {message ? message : `Deseja mesmo excluir ${element?.name}?`}
                </p>
                <form onSubmit={handleSubmit} className="flex justify-end space-x-2">
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        variant="destructive"
                    >
                        {processing ? 'Excluindo...' : `Excluir ${label}`}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};