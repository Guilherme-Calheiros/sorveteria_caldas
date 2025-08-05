import { Input } from "./ui/input";

export default function Checkbox({ className = '', ...props }) {
    return (
        <Input
            {...props}
            type="checkbox"
        />
    );
}
