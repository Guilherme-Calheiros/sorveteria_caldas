import { formataNumeroParaInput, parseInputMoeda } from '@/Utils/moeda';
import { useState, useEffect } from 'react';
import { Input } from './ui/input';

export default function InputMoney({ value = '', onChange, addonBefore = 'R$', ...props }) {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      setCurrentValue('');
    } else {
      setCurrentValue(formataNumeroParaInput(parsed));
    }
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseInputMoeda(e.target.value)
    setCurrentValue(formataNumeroParaInput(newValue));

    if (onChange) {
      onChange(newValue);
    }

  };

  return (
    <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
            {addonBefore}
        </span>
        <Input
            {...props}
            value={currentValue}
            onChange={handleChange}
            className='px-8'
            inputMode="numeric"
        />
    </div>
  );
}
