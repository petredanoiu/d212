import { AppContext } from '@/app/applicationcontext-provider';
import { FocusEvent, use, useState } from 'react';

type InputComponentProp = {
  name: string;
  type: 'text' | 'email' | 'number' | 'date';
  label: string;
  value: string;
  arrayId?: number;
};

export default function InputObligatoriuComponent({
  name,
  type,
  label,
  value,
  arrayId,
}: InputComponentProp) {
  const { inputChange } = use(AppContext);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.trim()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    inputChange(name, value, arrayId);
  };

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium'>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={`mt-1 block w-full border ${
          !isValid ? 'border-red-500' : 'border-gray-300'
        }  rounded-md p-2`}
      />
      {!isValid && (
        <p className='text-red-500 text-sm mt-1'>Numele este obligatoriu!</p>
      )}
    </div>
  );
}
