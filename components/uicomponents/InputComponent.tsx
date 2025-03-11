import { AppContext } from '@/app/applicationcontext-provider';
import { use } from 'react';

type InputComponentProp = {
  name: string;
  type: 'text' | 'email' | 'number' | 'date';
  label: string;
  value: string;
  arrayId?: number;
};

export default function InputComponent({
  name,
  type,
  label,
  value,
  arrayId,
}: InputComponentProp) {
  const { inputChange } = use(AppContext);

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
        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
