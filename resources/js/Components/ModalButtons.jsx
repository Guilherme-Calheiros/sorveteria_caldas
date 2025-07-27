import { Button } from "@/components/ui/button";
import SecondaryButton from "./SecondaryButton";

export default function ModalButtons({
    onCancelar,
    onConfirmar,
    textoConfirmar = "Salvar",
    textoCancelar = "Cancelar",
    processing = false,
    tipoConfirmar = "submit",
    variantConfirmar = "default"
}) {
    return (
        <div className="flex justify-end gap-2">
            <SecondaryButton onClick={onCancelar}>
                {textoCancelar}
            </SecondaryButton>
            <Button
                type={tipoConfirmar}
                disabled={processing}
                variant={variantConfirmar}
                onClick={tipoConfirmar !== "submit" ? onConfirmar : undefined}
            >
                {processing ? "Salvando..." : textoConfirmar}  
            </Button>
        </div>
    );
}