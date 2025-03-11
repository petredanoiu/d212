import { FocusEvent, use, useState } from 'react';
import { isCUI, type ValidCui } from '@/utils/validare';
import { AppContext } from '@/app/applicationcontext-provider';

type CifProp = {
  value: string;
  arrayId?: number;
};

export default function Cif({ value, arrayId }: CifProp) {
  const { inputChange } = use(AppContext);

  const [isValidCif, setIsValidCif] = useState<ValidCui>({
    isValid: true,
    message: '',
  });

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsValidCif(isCUI(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    inputChange(name, value, arrayId);
  };
  return (
    <div>
      <label htmlFor='cif' className='block text-sm font-medium'>
        Cod de identificare fiscală
      </label>
      <input
        type='text'
        id='cif'
        name='cif'
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={`mt-1 block w-full border ${
          isValidCif ? 'border-gray-300' : 'border-red-500'
        } rounded-md p-2`}
      />
      {!isValidCif.isValid && (
        <p className='text-red-500 text-sm mt-1'>{isValidCif.message}</p>
      )}
    </div>
  );
}
