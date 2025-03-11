import type { Contact } from '@/types/types';
import InputComponent from '../uicomponents/InputComponent';

type ContactProps = Contact & {
  arrayId?: number;
};

export default function Contact({ telefon, email, arrayId }: ContactProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold'>Informații de contact</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
        <InputComponent
          name='telefon'
          type='text'
          label='Telefon'
          value={telefon}
          arrayId={arrayId}
        />
        <InputComponent
          name='email'
          type='email'
          label='E-mail'
          value={email}
          arrayId={arrayId}
        />
      </div>
    </div>
  );
}
