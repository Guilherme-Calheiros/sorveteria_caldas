import { useState } from "react";

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
            <input
                type="text"
                value={value}
                placeholder="Email"
                onBlur={handleBlur}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
        </div>
    )
}