/**
 * Componenta CAS gestionează validările și calculele pentru contribuția de asigurări sociale.
 *
 * Logica de validare și calcul:
 * - Selectia Doriti sa platiti CAS? - `optiuneCAS` - utilizatorul poate alege să plătească CAS sau nu. Dacă alege să plătească, toate câmpurile sunt active.
 * - 1. Total venituri anuale realizate - `totalVenituri` - este un câmp obligatoriu, dar nu este folosit în calcule.
 *   Dacă utilizatorul alege să nu plătească CAS (`optiuneCAS === '2'`), toate câmpurile sunt resetate si blocate.
 * - 2.Baza anuala de calcul  - `bazaCalcul`-  trebuie să fie cel puțin `12 * SALARIU_MINIM`. Dacă este mai mică, se resetează și afișează un mesaj de alertă.
 * - 3. CAS datorata(rd.2 * 0.25) - `casDatorat`- se calculează ca `bazaCalcul * 25%` și este actualizat automat la modificarea bazei de calcul.
 * - 4. CAS retinuta de platitorul de venit -`casRetinut`- nu poate fi mai mare decât `casDatorat`; dacă este introdusă o valoare mai mare, este resetată cu alertă.
 * - 5. Diferenta stabilita in plus(rd.3 - rd.4) -`diferenta`- este calculată ca `casDatorat - casRetinut` și se actualizează automat când se schimbă `casDatorat` sau `casRetinut`.
 */
/**
 * Componenta CAS gestionează validările și calculele pentru contribuția de asigurări sociale.
 */

'use client';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import RadioButton from '@/components/uicomponents/RadioButton';
import { roundToInteger } from '@/utils/mathUtils';
import IntegerPositiveComponent from './uicomponents/IntegerPositiveComponent';
import { CASType } from '@/types/types';
import { debounce } from 'lodash';

// Constante pentru calculul CAS
const SALARIU_MINIM = 3300;
const MIN_SALARII = 12 * SALARIU_MINIM;

export default function CAS() {
  const { elementeFormular, setActiveModule, setElementeFormular } = useContext(AppContext);
  const [bazaCalculErr, setBazaCalculErr] = useState<string>('');
  const [casRetinutErr, setCasRetinutErr] = useState<string>('');

  useEffect(() => {
    setActiveModule('cas');
  }, []);

  useEffect(() => {
    if (elementeFormular.cas.optiuneCAS === '2') {
      setElementeFormular({
        ...elementeFormular,
        cas: {
          optiuneCAS: '2',
          totalVenituri: '',
          bazaCalcul: '',
          casDatorat: '',
          casRetinut: '',
          diferenta: '',
        },
      });
      // Elimină alertele când CAS nu este selectat
      setBazaCalculErr('');
      setCasRetinutErr('');
    }
  }, [elementeFormular.cas.optiuneCAS]);

  // Calcul automat CAS datorat și diferența
  useEffect(() => {
    if (elementeFormular.cas.optiuneCAS === '2') return;

    const numericBazaCalcul = roundToInteger(parseFloat(elementeFormular.cas.bazaCalcul) || 0);
    const numericCasRetinut = roundToInteger(parseFloat(elementeFormular.cas.casRetinut) || 0);

    const casDatorat = numericBazaCalcul >= MIN_SALARII ? roundToInteger(numericBazaCalcul * 0.25) : '';
    const diferenta = casDatorat !== '' ? casDatorat - numericCasRetinut : '';

    setElementeFormular({
      ...elementeFormular,
      cas: {
        ...elementeFormular.cas,
        casDatorat: casDatorat.toString(),
        diferenta: diferenta.toString(),
      },
    });
  }, [elementeFormular.cas.bazaCalcul, elementeFormular.cas.casRetinut]);

  const handleBlurBazaCalcul = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = roundToInteger(parseFloat(value) || 0);

    if (numericValue < MIN_SALARII) {
      setBazaCalculErr('Baza anuala de calcul nu poate fi mai mica decat 12 salarii minime brute (39.600)');
      setElementeFormular({
        ...elementeFormular,
        cas: {
          ...elementeFormular.cas,
          bazaCalcul: '',
          casDatorat: '',
          casRetinut: '',
          diferenta: '',
        },
      });
    } else {
      setBazaCalculErr('');
    }
  };

  const handleBlurCasRetinut = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = roundToInteger(parseFloat(value) || 0);
    const casDatorat = roundToInteger(parseFloat(elementeFormular.cas.casDatorat) || 0);

    if (numericValue > casDatorat) {
      setCasRetinutErr('Cas retinut nu poate fi mai mare decat Cas datorat');
      setElementeFormular({
        ...elementeFormular,
        cas: {
          ...elementeFormular.cas,
          casRetinut: '',
          diferenta: '',
        },
      });
    } else {
      setCasRetinutErr('');
    }
  };

  return (
    <div className='space-y-4 p-4 border border-gray-300 rounded-md'>
      <h2 className='text-xl font-bold'>Contributia de asigurari sociale datorata</h2>
      <div className='mb-4'>
        <h2>Doriti sa platiti CAS?</h2>
        <div className='flex justify-start items-center space-x-4'>
          <RadioButton id='optiuneCASDa' name='optiuneCAS' label='Da' value={'1'} checked={elementeFormular.cas.optiuneCAS === '1'} />
          <RadioButton id='optiuneCASNu' name='optiuneCAS' label='Nu' value={'2'} checked={elementeFormular.cas.optiuneCAS === '2'} />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
        <IntegerPositiveComponent name='totalVenituri' label='1.Total venituri anuale realizate' value={elementeFormular.cas.totalVenituri} disabled={elementeFormular.cas.optiuneCAS === '2'} />
        <IntegerPositiveComponent name='bazaCalcul' label='2.Baza anuala de calcul' min={MIN_SALARII} value={elementeFormular.cas.bazaCalcul} onBlur={handleBlurBazaCalcul} disabled={elementeFormular.cas.optiuneCAS === '2'} errMessage={bazaCalculErr} />
        <IntegerPositiveComponent name='casDatorat' label='3.CAS datorata(rd2. x 25%)' value={elementeFormular.cas.casDatorat} readOnly />
        <IntegerPositiveComponent name='casRetinut' label='4.CAS retinuta de platitorul de venit' min={0} value={elementeFormular.cas.casRetinut} onBlur={handleBlurCasRetinut} disabled={elementeFormular.cas.optiuneCAS === '2'} errMessage={casRetinutErr} />
        <IntegerPositiveComponent name='diferenta' label='5.Diferenta stabilita in plus(rd.3-rd.4)' value={elementeFormular.cas.diferenta} readOnly />
      </div>
    </div>
  );
}
