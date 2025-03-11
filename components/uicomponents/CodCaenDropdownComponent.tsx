import { useContext } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import caen from '@/data/codCAEN.json';

type CodCaenDropdownProps = {
  name: string;
  value: string;
  label: string;
  arrayId?: number;
};

export default function CodCaenDropdownComponent({
  name,
  value,
  label,
  arrayId,
}: CodCaenDropdownProps) {
  const { inputChange } = useContext(AppContext);

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
        onChange={handleSelectChange}
        className='mt-1 block w-full border border-gray-300 rounded-md p-2'
        style={{ color: !value ? '#9CA3AF' : 'inherit' }}
      >
        <option value=''>Selectați codul caen</option>
        {caen.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}
