'use client';

import { AppContext } from '@/app/applicationcontext-provider';
import { use, useEffect } from 'react';
import Address from './sharedcomponents/Address';
import Contact from './sharedcomponents/Contact';
import PersonData from './sharedcomponents/PersonData';

export default function IdentificationData() {
  const { elementeFormular, setActiveModule } = use(AppContext);

  useEffect(() => {
    setActiveModule('dateIdentificare');
  }, []);

  // console.log('pagina de identificare', elementeFormular);

  return (
    <div className='space-y-4 p-4 border border-gray-300 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>
          Date de identificare a contribuabilului
        </h2>
      </div>

      <PersonData
        nume={elementeFormular.dateIdentificare.nume}
        prenume={elementeFormular.dateIdentificare.prenume}
        cif={elementeFormular.dateIdentificare.cif}
        initialaTata={elementeFormular.dateIdentificare.initialaTata}
      />

      <Address
        apartament={elementeFormular.dateIdentificare.apartament}
        bloc={elementeFormular.dateIdentificare.bloc}
        codpostal={elementeFormular.dateIdentificare.codpostal}
        etaj={elementeFormular.dateIdentificare.etaj}
        judet={elementeFormular.dateIdentificare.judet}
        localitate={elementeFormular.dateIdentificare.localitate}
        numar={elementeFormular.dateIdentificare.numar}
        scara={elementeFormular.dateIdentificare.scara}
        strada={elementeFormular.dateIdentificare.strada}
      />

      <Contact
        email={elementeFormular.dateIdentificare.email}
        telefon={elementeFormular.dateIdentificare.telefon}
      />
    </div>
  );
}
