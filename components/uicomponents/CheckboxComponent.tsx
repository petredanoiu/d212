import { useContext } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';

type CheckboxComponentProps = {
  name: string;
  value: boolean;
  label: string;
  arrayId: number;
};

export default function CheckboxComponent({
  name,
  value = false,
  label,
  arrayId
}: CheckboxComponentProps) {
  const { inputChange } = useContext(AppContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputChange(name, e.target.checked, arrayId);
  };

  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={Boolean(value)}
          onChange={handleChange}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    </div>
  );
}