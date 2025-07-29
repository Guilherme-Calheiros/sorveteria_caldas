import { useState } from "react";
import InputError from "./InputError";
import { Input } from "./ui/input";


export default function InputEmail({ value, onChange}) {
    const [emailError, setEmailError] = useState('')

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleBlur = () => {
        if (value && !isValidEmail(value)){
            setEmailError('Email inválido')
        } else {
            setEmailError('')
        }
    }

    return(
        <div>
            <Input
                type="email"
                value={value}
                placeholder="Email"
                isFocused={false}
                onBlur={handleBlur}
                onChange={(e) => onChange(e.target.value)}
            />
            <InputError message={emailError} className="mt-1" />
        </div>
    )
}