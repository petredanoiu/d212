import { AppContext } from '@/app/applicationcontext-provider';
import React, { use } from 'react';

type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  arrayId?: number;
};

export default function RadioButton({
  id,
  name,
  value,
  label,
  checked,
  arrayId,
}: RadioButtonProps) {
  const { inputChange } = use(AppContext);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    inputChange(name, value, arrayId);
  };

  return (
    <div className='flex items-center'>
      <input
        id={id}
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={handleRadioChange}
        className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
      />
      <label
        htmlFor={id}
        className='ml-2 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
    </div>
  );
}
