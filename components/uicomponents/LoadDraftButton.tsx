'use client';

import { AppContext } from '@/app/applicationcontext-provider';
import { FormElements } from '@/types/types';
import { parseXML } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function LoadDraftButton() {
  const { setElementeFormular } = use(AppContext);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text: string = await file.text();
    const formData: FormElements = parseXML(text);

    setElementeFormular(formData);
    router.push('/');
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        type='file'
        accept='.xml'
        onChange={handleFileChange}
        className='hidden'
        id='xml-upload'
      />
      <label
        htmlFor='xml-upload'
        className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium duration-200'
      >
        Importa draft
      </label>
    </div>
  );
}
