import { AppContext } from '@/app/applicationcontext-provider';
import { OptionType } from '@/types/types';
import { use } from 'react';

type SelectComponentProps = {
  name: string;
  label: string;
  defaultOptionSelect?: string;
  value: string;
  options: OptionType[];
  arrayId?: number;
};

export default function SelectComponent({
  name,
  label,
  defaultOptionSelect = 'Selectează o opțiune',
  value,
  options,
  arrayId,
}: SelectComponentProps) {
  const { inputChange } = use(AppContext);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    inputChange(name, value, arrayId);
  };

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium'>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
        style={{ color: !value ? '#9CA3AF' : 'inherit' }}
        onChange={handleSelectChange}
      >
        <option value='' disabled>
          {defaultOptionSelect}
        </option>
        {options.map((option) => (
          <option 
            key={option.id} 
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
