import { desformataTelefone, formataTelefone, isTelefoneValido } from '@/Utils/telefone';
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';

export default function InputTelefone({ value = '', onChange }) {
    const [telefone, setTelefone] = useState(formataTelefone(value));
    const [error, setError] = useState('');

    useEffect(() => {
        setTelefone(formataTelefone(value));
    }, [value]);


    const handleChange = (e) => {
        const raw = e.target.value;
        const formattedValue = formataTelefone(raw);
        setTelefone(formattedValue);
        
        if (onChange) {
            onChange(desformataTelefone(formattedValue));
        }
    };

    const handleBlur = () => {
        if (telefone && !isTelefoneValido(telefone)) {
        setError('Número de telefone inválido');
        } else {
        setError('');
        }
    };

    return (
        <div>
        <Input
            type="tel"
            value={telefone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(00) 00000-0000"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
