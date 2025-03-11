'use client';

import { AppContext } from '@/app/applicationcontext-provider';
import { VenituriStrainatateType } from '@/types/types';
import { use, useEffect, useState } from 'react';
import Button from './uicomponents/Button';
import TabButton from './uicomponents/TabButton';
import VenituriStrainatateComponent from './VenituriStrainatateComponent';

export default function VenituriStrainatate() {
  const { elementeFormular, setElementeFormular, setActiveModule } =
    use(AppContext);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setActiveModule('venituriStrainatate');
    const firstDest = elementeFormular.venituriStrainatate.find(
      (venit) => venit.id !== undefined
    );
    if (firstDest) {
      setActiveTab(firstDest.id);
    }
  }, [setActiveModule]);

  const addVenit = () => {
    const newVenit: VenituriStrainatateType = {
      id: Date.now(),
      categorieVenitStrainatate: '',
      taraVenit: '',
      evitareDublaImpunere: '',
      venitScutitAcordInternational: false,
      //dateIdentificareSediu: '',
      //numarDocument: '',
      //dataDocument: '',
      dataIncepereStrainatate: '',
      dataIncetareStrainatate: '',
      //zileScutire: '',
      venitBrutStrainatate: '',
      cheltuieliStrainatate: '',
      venitNetStrainatate: '',
      pierdereAnualaStrainatate: '',
      pierderePrecedentaStrainatate: '',
      pierdereCompensataStrainatate: '',
      venitImpozabilStrainatate: '',
      impozitDatoratInRomania: '',
      impozitPlatitStrainatate: '',
      creditFiscal: '',
      diferentaImpozitDePlata: '',
      //cif: '',
    };
    setElementeFormular({
      ...elementeFormular,
      venituriStrainatate: [...elementeFormular.venituriStrainatate, newVenit],
    });
    setActiveTab(newVenit.id);
  };

  const removeVenit = (id: number) => {
    const updatedVenituri = elementeFormular.venituriStrainatate.filter(
      (venit) => venit.id !== id
    );
    setElementeFormular({
      ...elementeFormular,
      venituriStrainatate: updatedVenituri,
    });

    if (id === activeTab) {
      setActiveTab(updatedVenituri.length > 0 ? updatedVenituri[0].id : 0);
    }
  };

  console.log('pagina venituri strainatate', elementeFormular);
  return (
    <div className='space-y-4 p-4 border border-gray-300 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Venituri din strainatate</h2>
        <Button
          title='Adaugă venit'
          css='px-4 bg-blue-600 text-white hover:bg-blue-700'
          onclick={addVenit}
        />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        {elementeFormular.venituriStrainatate.map((venit, index) => (
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
      {elementeFormular.venituriStrainatate.map(
        (venit) =>
          activeTab === venit.id && (
            <VenituriStrainatateComponent
              key={venit.id}
              {...venit} // Spread all properties from venit object
            />
          )
      )}
    </div>
  );
}
