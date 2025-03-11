import { useContext } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';

type TaxationMethodDropdownProps = {
  name: string;
  value: string;
  label: string;
  arrayId: number;
};

export default function TaxationMethodDropdownComponent({
  name,
  value,
  label,
  arrayId,
}: TaxationMethodDropdownProps) {
  const { inputChange } = useContext(AppContext);

  const methods = [
    { id: 'credit', name: 'Credit fiscal' },
    { id: 'exemption', name: 'Scutire' },
  ];

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
      >
        <option value=''>Selectați metoda</option>
        {methods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name}
          </option>
        ))}
      </select>
    </div>
  );
}
