import { AppContext } from '@/app/applicationcontext-provider';
import { use } from 'react';

type TextInputProps = {
  label: string;
  name: string;
  value: string;
  arrayId?: number;
};

export default function TextInputComponent({
  label,
  name,
  value,
  arrayId,
}: TextInputProps) {
  const { inputChange } = use(AppContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    inputChange(name, value, arrayId);
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
        type='text'
        id={arrayId ? `${name}_${arrayId}` : name}
        name={name}
        value={value}
        onChange={handleInputChange}
        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
      />
    </div>
  );
}
