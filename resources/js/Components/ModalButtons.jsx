import { Button } from "@/components/ui/button";

export default function ModalButtons({
    onCancelar,
    onConfirmar,
    textoConfirmar = "Salvar",
    textoCancelar = "Cancelar",
    processing = false,
    tipoConfirmar = "submit",
    variantConfirmar = "secondary"
}) {
    return (
        <div className="flex justify-end gap-2">
            <Button onClick={onCancelar} variant="outline" type="button">
                {textoCancelar}
            </Button>
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