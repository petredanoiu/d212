import { AppContext } from '@/app/applicationcontext-provider';
import React, { use } from 'react';

type CheckBoxButtonProps = {
  name: string;
  label: string;
  checked: boolean;
  // value: string;
  arrayId?: number;
};

export default function CheckBoxButton({
  name,
  label,
  checked,
  // value,
  arrayId,
}: CheckBoxButtonProps) {
  const { inputChange } = use(AppContext);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    inputChange(name, checked, arrayId);
  };

  return (
    <div className='flex items-center'>
      <input
        id={name}
        type='checkbox'
        name={name}
        // value={value}
        checked={checked}
        onChange={handleRadioChange}
        className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
      />
      <label
        htmlFor={name}
        className='ml-2 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
    </div>
  );
}
