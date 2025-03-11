'use client';

import { AppContext } from '@/app/applicationcontext-provider';
import { VenituriRomaniaType } from '@/types/types';
import { use, useEffect, useState } from 'react';
import Button from './uicomponents/Button';
import TabButton from './uicomponents/TabButton';
import VenituriRomaniaComponent from './VenituriRomaniaComponent';

export default function VenituriRomania() {
  const { elementeFormular, setElementeFormular, setActiveModule } =
    use(AppContext);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setActiveModule('venituriRomania');
    const firstDest = elementeFormular.venituriRomania.find(
      (venit) => venit.id !== undefined
    );
    if (firstDest) {
      setActiveTab(firstDest.id);
    }
  }, [setActiveModule]);

  const addVenit = () => {
    const newVenit: VenituriRomaniaType = {
      id: Date.now(),
      categorieVenit: '',
      determinareVenit: '',
      formaOrganizare: '',
      nomenclatorCAEN: '',
      dateIdentificareSediu: '',
      numarDocument: '',
      dataDocument: '',
      dataIncepere: '',
      dataIncetare: '',
      zileScutire: '',
      venitBrut: '',
      cheltuieli: '',
      venitNet: '',
      pierdereAnuala: '',
      pierderePrecedenta: '',
      pierdereCompensata: '',
      venitImpozabil: '',
      venitRedus: '',
      impozitDatorat: '',
      //denumire: '',
      //iban: '',
      //cif: '',
    };
    setElementeFormular({
      ...elementeFormular,
      venituriRomania: [...elementeFormular.venituriRomania, newVenit],
    });
    setActiveTab(newVenit.id);
  };

  const removeVenit = (id: number) => {
    const updatedVenituri = elementeFormular.venituriRomania.filter(
      (venit) => venit.id !== id
    );
    setElementeFormular({
      ...elementeFormular,
      venituriRomania: updatedVenituri,
    });

    if (id === activeTab) {
      setActiveTab(updatedVenituri.length > 0 ? updatedVenituri[0].id : 0);
    }
  };

  console.log('pagina venituri', elementeFormular);
  return (
    <div className='space-y-4 p-4 border border-gray-300 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Venituri din România</h2>
        <Button
          title='Adaugă venit'
          css='px-4 bg-blue-600 text-white hover:bg-blue-700'
          onclick={addVenit}
        />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        {elementeFormular.venituriRomania.map((venit, index) => (
          <TabButton
            key={venit.id}
            activeTab={activeTab}
            id={venit.id}
            label={`Venit ${index + 1}`}
            setActiveTab={setActiveTab}
            removeActivTab={removeVenit}
          />
        ))}
      </div>
      {elementeFormular.venituriRomania.map(
        (venit) =>
          activeTab === venit.id && (
            <VenituriRomaniaComponent
              key={venit.id}
              {...venit} // Spread all properties from venit object
            />
          )
      )}
    </div>
  );
}
