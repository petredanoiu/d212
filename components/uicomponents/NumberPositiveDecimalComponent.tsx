//Accept positive decimal numbers only from 0 to 99.99999
//Allow up to 5 decimal places
//Limit values to 100 or less
//Accept exactly 100 (no decimals)
//Reject 100.00001 or any decimal after 100
//Prevent multiple decimal points
//Allow leading zero only for decimal numbers (e.g., "0.5" is valid, "01.5" is not)
//Not allow the 'e' character
//Not allow negative numbers
//inputMode="decimal" for allowing decimal input on mobile keyboards

import { AppContext } from '@/app/applicationcontext-provider';
import { use } from 'react';

type InputComponentProp = {
  name: string;
  label: string;
  value: string;
  arrayId?: number;
};

export default function InputComponent({
  name,
  label,
  value = '',
  arrayId,
}: InputComponentProp) {
  const { inputChange } = use(AppContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    
    // Remove any non-digit characters except decimal point
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Allow empty input for typing process
    if (sanitizedValue === '' || sanitizedValue === '.') {
      inputChange(name, sanitizedValue, arrayId);
      return;
    }

    // Handle special case for 100
    if (sanitizedValue.startsWith('100')) {
      if (sanitizedValue === '100') {
        inputChange(name, '100', arrayId);
      }
      return;
    }

    // Ensure only one decimal point
    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
      return;
    }

    // Limit decimal places to 5
    if (parts[1] && parts[1].length > 5) {
      return;
    }

    // Convert to number to check if it's valid
    const numberValue = parseFloat(sanitizedValue);
    
    // Validation rules:
    // 1. Must be a valid number
    // 2. Must be < 100
    // 3. Must not start with 0 unless it's a decimal
    if (!isNaN(numberValue) && 
        numberValue < 100 && 
        !/^0\d/.test(sanitizedValue) && // allows '0.' but not '01'
        !inputValue.includes('e')) {
      inputChange(name, sanitizedValue, arrayId);
    }
  };

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium'>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
        value={value || ''}
        onChange={handleInputChange}
        pattern="^(100|([0-9]{1,2})(\.[0-9]{1,5})?)$"
        inputMode="decimal"
        placeholder="0.00000"
      />
    </div>
  );
}
