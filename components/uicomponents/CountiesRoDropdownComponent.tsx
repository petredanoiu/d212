import { useContext } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import countries from '@/data/counties-RO.json';

type CountryDropdownProps = {
  name: string;
  value: string;
  label: string;
  arrayId?: number;
};

export default function CountiesRoDropdownComponent({
  name,
  value,
  label,
  arrayId,
}: CountryDropdownProps) {
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
        <option value=''>Selectați județul</option>
        {countries.map((country) => (
          <option key={country.alpha2} value={country.alpha2}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}
