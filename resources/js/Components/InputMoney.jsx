import { useState, useEffect } from 'react';

const DECIMAL_SIZE = 2;
const MAX_LENGTH = 15;

export default function InputMoney({ value = '', onChange, addonBefore = 'R$', ...props }) {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      setCurrentValue('');
    } else {
      setCurrentValue(parsed.toLocaleString('pt-BR', {
        minimumFractionDigits: DECIMAL_SIZE,
        maximumFractionDigits: DECIMAL_SIZE,
      }));
    }
  }, [value]);

  const handleChange = (e) => {
    let onlyNums = e.target.value.replace(/\D/g, '');

    if (onlyNums.length > MAX_LENGTH) {
      onlyNums = onlyNums.slice(0, MAX_LENGTH);
    }

    const padded = onlyNums.padStart(DECIMAL_SIZE + 1, '0');

    const inteiro = padded.slice(0, -DECIMAL_SIZE);
    const decimal = padded.slice(-DECIMAL_SIZE);

    const newValue = `${parseInt(inteiro, 10)}.${decimal}`;

    onChange({
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    });

    setCurrentValue(`${parseInt(inteiro, 10).toLocaleString('pt-BR')},${decimal}`);
  };

  return (
    <div className="relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
            {addonBefore}
        </span>
        <input
            {...props}
            value={currentValue}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-8 py-2'
            inputMode="numeric"
        />
    </div>
  );
}
