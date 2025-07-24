import { Button } from "@/components/ui/button";
import { LuSquarePen, LuTrash } from "react-icons/lu";

export default function TableActions({ onEditar, onExcluir }) {
    return (
        <div className="flex justify-center items-center">
            <Button onClick={onEditar} variant="ghost" size="icon">
                <LuSquarePen />
            </Button>
            <Button onClick={onExcluir} variant="ghost" size="icon">
                <LuTrash />
            </Button>
        </div>
    );
}