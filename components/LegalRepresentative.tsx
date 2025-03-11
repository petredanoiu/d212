'use client';

import { use, useEffect } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import Address from './sharedcomponents/Address';
import Contact from './sharedcomponents/Contact';
import EntityData from './sharedcomponents/EntityData';
import PersonData from './sharedcomponents/PersonData';
import RadioButton from './uicomponents/RadioButton';

export default function LegalRepresentative() {
  const { elementeFormular, setActiveModule } = use(AppContext);

  useEffect(() => {
    setActiveModule('dateImputernicit');
  }, [setActiveModule]);

  // console.log('pagina imputernincit', elementeFormular);

  return (
    <div className='space-y-4 p-4 border border-gray-300 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>
          Date de identificare ale entității raportoare
        </h2>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>Tip Entitate</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
          <div className='flex items-center space-x-4'>
            <RadioButton
              id='pf-radio'
              name='tipPersoana'
              value={'0'}
              label='Persoana Fizica'
              checked={elementeFormular.dateImputernicit.tipPersoana === '0'}
            />
            <RadioButton
              id='pj-radio'
              name='tipPersoana'
              value={'1'}
              label='Persoana Juridica'
              checked={elementeFormular.dateImputernicit.tipPersoana === '1'}
            />
          </div>
        </div>
      </div>

      {elementeFormular.dateImputernicit.tipPersoana === '0' ? (
        <PersonData
          nume={elementeFormular.dateImputernicit.nume}
          prenume={elementeFormular.dateImputernicit.prenume}
          initialaTata={elementeFormular.dateImputernicit.initialaTata}
          cif={elementeFormular.dateImputernicit.cif}
        />
      ) : (
        <EntityData
          denumire={elementeFormular.dateImputernicit.denumire}
          cif={elementeFormular.dateImputernicit.cif}
          iban={elementeFormular.dateImputernicit.iban}
          isIban={true}
        />
      )}

      <Address
        apartament={elementeFormular.dateImputernicit.apartament}
        bloc={elementeFormular.dateImputernicit.bloc}
        codpostal={elementeFormular.dateImputernicit.codpostal}
        etaj={elementeFormular.dateImputernicit.etaj}
        judet={elementeFormular.dateImputernicit.judet}
        localitate={elementeFormular.dateImputernicit.localitate}
        numar={elementeFormular.dateImputernicit.numar}
        scara={elementeFormular.dateImputernicit.scara}
        strada={elementeFormular.dateImputernicit.strada}
      />

      <Contact
        telefon={elementeFormular.dateImputernicit.telefon}
        email={elementeFormular.dateImputernicit.email}
      />
    </div>
  );
}
