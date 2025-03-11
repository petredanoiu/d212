/**
 * Componenta CASS - Contribuția de Asigurări Sociale de Sănătate
 * 
 * Această componentă permite utilizatorului să selecteze dacă dorește să plătească CASS și să introducă informațiile relevante pentru calculul contribuției.
 * Calculul și validarea se realizează astfel:
 * - Baza anuală de calcul - 'bazaCalcul' - trebuie să fie fie venitul total declarat - 'totalVenituri' - , fie minimul de 6 salarii minime brute pe economie.
 * - Contribuția datorată - 'cassDatorat' - este 10% din baza de calcul.
 * - Există două opțiuni pentru CASS reținut (alin. 6 și alin. 7 din Codul Fiscal) - 'cassRetinut_6' si 'cassRetinut_7' - , iar validările asigură că acestea nu sunt utilizate simultan.
 * - Diferențele  - 'diferentaPlus_6', 'diferentaMinus_6' si 'diferentaMinus_7' - sunt calculate pentru a determina dacă mai există sume de plată sau compensări.
 */

'use client';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import RadioButton from '@/components/uicomponents/RadioButton';
import { roundToInteger } from '@/utils/mathUtils';
import IntegerPositiveComponent from './uicomponents/IntegerPositiveComponent';

// Constante pentru calculul CASS
const SALARIU_MINIM = 3300;
const MIN_SALARII = 19800;
const MAX_SALARII = 198000;

export default function CASS() {
  const { elementeFormular, setActiveModule, setElementeFormular } = useContext(AppContext);
  const [bazaCalculErr, setBazaCalculErr] = useState<string>('');
  const [cassRetinut6Err, setCassRetinut6Err] = useState<string>('');
  const [cassRetinut7Err, setCassRetinut7Err] = useState<string>('');

  useEffect(() => {
    setActiveModule('cass');

  }, []);

  useEffect(() => {
    if (elementeFormular.cass.optiuneCASS === '2') {
      setElementeFormular({
        ...elementeFormular,
        cass: {
          optiuneCASS: '2',
          totalVenituri: '',
          bazaCalcul: '',
          cassDatorat: '',
          cassRetinut_6: '',
          diferentaPlus_6: '',
          diferentaMinus_6: '',
          cassRetinut_7: '',
          diferentaMinus_7: '',
        },
      });
      setBazaCalculErr('');
      setCassRetinut6Err('');
      setCassRetinut7Err('');
    }
  }, [elementeFormular.cass.optiuneCASS]);
  const handleBlurBazaCalcul = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = roundToInteger(parseFloat(value) || 0);
    const totalVenituri = roundToInteger(parseFloat(elementeFormular.cass.totalVenituri) || 0);

    if (numericValue > MAX_SALARII) {
      setBazaCalculErr(`Baza anuala de calcul nu poate fi mai mare de ${MAX_SALARII}`);
    } else if (numericValue !== totalVenituri && numericValue !== MIN_SALARII) {
      setBazaCalculErr(`Baza de calcul trebuie sa fie egala cu veniturile totale sau minim ${MIN_SALARII}`);
    } else {
      setBazaCalculErr('');
    }
  };

  const handleBlurCassRetinut6 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = roundToInteger(parseFloat(value) || 0);

    if (numericValue > 0 && elementeFormular.cass.cassRetinut_7 !== '') {
      setCassRetinut6Err('Nu se poate completa acest camp daca CASS retinuta 7 este introdusa');
    } else {
      setCassRetinut6Err('');
    }
  };

  const handleBlurCassRetinut7 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = roundToInteger(parseFloat(value) || 0);

    if (numericValue <= MIN_SALARII && elementeFormular.cass.cassRetinut_7 !== '') {
      elementeFormular.cass.cassRetinut_7 = '';
      setCassRetinut7Err(`CASS retinuta 7 trebuie sa fie strict mai mare decat ${MIN_SALARII}`);
    } else if (numericValue > 0 && elementeFormular.cass.cassRetinut_6 !== '') {
      elementeFormular.cass.cassRetinut_7 = '';
      setCassRetinut7Err('Nu se poate completa acest camp daca CASS retinuta 6 este introdusa');
    } else {
      setCassRetinut7Err('');
    }
  };
  useEffect(() => {
    if (elementeFormular.cass.optiuneCASS === '2') return;

    const bazaCalcul = roundToInteger(parseFloat(elementeFormular.cass.bazaCalcul) || 0);
    const cassDatorat = roundToInteger(bazaCalcul * 0.1);
    const cassRetinut6 = roundToInteger(parseFloat(elementeFormular.cass.cassRetinut_6) || 0);
    const cassRetinut7 = roundToInteger(parseFloat(elementeFormular.cass.cassRetinut_7) || 0);
    
    let diferentaPlus6 = '';
    let diferentaMinus6 = '';
    let diferentaMinus7 = '';

    if (cassRetinut6 > 0) {
      diferentaPlus6 = cassDatorat - cassRetinut6 > 0 ? (cassDatorat - cassRetinut6).toString() : '';
      diferentaMinus6 = cassDatorat - cassRetinut6 <= 0 ? (- (cassDatorat - cassRetinut6)).toString() : '';
    }

    if (cassRetinut7 > MIN_SALARII) {
      diferentaMinus7 = (cassRetinut7 - MIN_SALARII).toString();
    }

    setElementeFormular({
      ...elementeFormular,
      cass: {
        ...elementeFormular.cass,
        cassDatorat: cassDatorat.toString(),
        diferentaPlus_6: diferentaPlus6,
        diferentaMinus_6: diferentaMinus6,
        diferentaMinus_7: diferentaMinus7,
      },
    });
    
  }, [elementeFormular.cass.bazaCalcul, elementeFormular.cass.totalVenituri, elementeFormular.cass.cassRetinut_6, elementeFormular.cass.cassRetinut_7]);

  return (
    <div className='space-y-4 p-4 border border-gray-300 rounded-md'>
      <h2 className='text-xl font-bold'>Contributia de asigurari sociale de sanatate datorata</h2>
      <div className='mb-4'>
        <h2>Doriti sa platiti CASS?</h2>
        <div className='flex justify-start items-center space-x-4'>
          <RadioButton id='optiuneCASSDa' name='optiuneCASS' label='Da' value={'1'} checked={elementeFormular.cass.optiuneCASS === '1'} />
          <RadioButton id='optiuneCASSNu' name='optiuneCASS' label='Nu' value={'2'} checked={elementeFormular.cass.optiuneCASS === '2'} />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
        <IntegerPositiveComponent name='totalVenituri' label='1.Total venit anual cumulat din activitati independente' value={elementeFormular.cass.totalVenituri} disabled={elementeFormular.cass.optiuneCASS === '2'}/>
        <IntegerPositiveComponent name='bazaCalcul' label='2.Baza anuala de calcul al CASS' onBlur={handleBlurBazaCalcul} value={elementeFormular.cass.bazaCalcul} disabled={elementeFormular.cass.optiuneCASS === '2'} errMessage={bazaCalculErr} />
        <IntegerPositiveComponent name='cassDatorat' label='3.CASS datorata (rd2. x 10%)' value={elementeFormular.cass.cassDatorat} readOnly />
        <IntegerPositiveComponent name='cassRetinut_6' label='4.CASS retinuta de platitorul de venit conform art.164 alin.(6) din Codul fiscal' onBlur={handleBlurCassRetinut6} value={elementeFormular.cass.cassRetinut_6} disabled={elementeFormular.cass.optiuneCASS === '2'} errMessage={cassRetinut6Err} />
        <IntegerPositiveComponent name='diferentaPlus_6' label='5.Diferenta stabilita in plus(rd.3-rd.4)' value={elementeFormular.cass.diferentaPlus_6} readOnly />
        <IntegerPositiveComponent name='diferentaMinus_6' label='6.Diferenta stabilita in minus(rd.4-rd.3)'  value={elementeFormular.cass.diferentaMinus_6}  readOnly />
        <IntegerPositiveComponent name='cassRetinut_7' label='7.CASS retinuta de platitorul de venit conform art.164 alin.(7) din Codul fiscal' onBlur={handleBlurCassRetinut7} value={elementeFormular.cass.cassRetinut_7} disabled={elementeFormular.cass.optiuneCASS === '2'} errMessage={cassRetinut7Err} />
        <IntegerPositiveComponent name='diferentaMinus_7' label='8.Diferenta stabilita in minus(rd.7 - 19.800 lei)' value={elementeFormular.cass.diferentaMinus_7} readOnly />
      </div>
    </div>
  );
}
