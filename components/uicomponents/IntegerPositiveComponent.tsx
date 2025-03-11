/**
 * IntegerPositiveComponent
 *
 * Această componentă gestionează un input numeric pozitiv cu validare avansată.
 * Caracteristici principale:
 * - Permite doar valori numerice întregi, eliminând orice caractere non-numerice.
 * - Elimină zerourile din față, dar permite '0' singur
 * - Previne introducerea valorilor negative folosind `min`.
 * - Blochează tastele `e`, `E`, `+`, `-` pentru a evita formatele numerice exponențiale.
 * - Oferă opțiunea de a seta o valoare maximă (`max`) și lungimea maximă (`maxLength`).
 * - La `onBlur`, valoarea se ajustează automat pentru a respecta limitele minime și maxime.
 * - Dacă utilizatorul introduce caractere non-numerice, ultima valoare validă este păstrată.
 */

import { AppContext } from '@/app/applicationcontext-provider';
import { useContext, useState } from 'react';

type IntegerPositiveComponentProps = {
  label: string;
  name: string;
  value: string;
  arrayId?: number;
  max?: number;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  min?: number;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errMessage?: string;
};

export default function IntegerPositiveComponent({
  label,
  name,
  value,
  arrayId,
  max,
  maxLength,
  readOnly,
  disabled,
  min = 0,
  onBlur,
  errMessage,
}: IntegerPositiveComponentProps) {
  const { inputChange } = useContext(AppContext);
  const [lastValidValue, setLastValidValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = e.target.value.replace(/[^0-9]/g, ''); // 🔹 Elimină caracterele non-numerice
    sanitizedValue = sanitizedValue.replace(/^0+(?=\d)/, ''); // 🔹 Elimină zerourile din față, dar permite '0' singur
    sanitizedValue = sanitizedValue.slice(0, maxLength || 15); // 🔹 Trunchiază valoarea la maxLength (implicit 15)
    if (sanitizedValue === '') {
      setLastValidValue(''); //  Permite ștergerea completă
    } else {
      setLastValidValue(sanitizedValue); // 🔹 Salvăm ultima valoare validă
    }

    if (max && parseInt(sanitizedValue) > max) {
      sanitizedValue = max.toString();
    }

    inputChange(name, sanitizedValue, arrayId);
  };
  return (
    <div className='mb-4'>
      <label
        htmlFor={arrayId ? `${name}_${arrayId}` : name}
        className='block text-sm font-medium'
      >
        {label}
      </label>
      <input
        type='number'
        id={arrayId ? `${name}_${arrayId}` : name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        step='1'
        className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
          readOnly ? 'bg-gray-100' : ''
        } ${errMessage ? 'border-red-800' : ''}`}
        onKeyDown={(e) => {
          if (
            e.key === 'e' ||
            e.key === 'E' ||
            e.key === '+' ||
            e.key === '-'
          ) {
            e.preventDefault();
          }
        }}
      />
      {errMessage && <p className='text-red-500 text-sm mt-1'>{errMessage}</p>}
    </div>
  );
}
