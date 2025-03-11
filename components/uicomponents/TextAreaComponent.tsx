import { AppContext } from '@/app/applicationcontext-provider';
import { use } from 'react';

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  arrayId?: number;
};

export default function TextAreaComponent({
  label,
  name,
  value,
  arrayId,
}: TextAreaProps) {
  const { inputChange } = use(AppContext);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={arrayId ? `${name}_${arrayId}` : name}
        name={name}
        value={value}
        onChange={handleTextAreaChange}
        rows={3}
        className='mt-1 block w-full border border-gray-300 rounded-md sm:text-sm'
      />
    </div>
  );
}
