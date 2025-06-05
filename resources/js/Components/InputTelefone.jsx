import { desformataTelefone, formataTelefone, isTelefoneValido } from '@/Utils/telefone';
import React, { useState, useEffect } from 'react';

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
        <input
            type="tel"
            value={telefone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(00) 00000-0000"
            className='w-full border border-gray-300 rounded px-3 py-2'
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
