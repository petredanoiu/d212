import { useContext, useEffect, useCallback } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import IntegerPositiveComponent from '../uicomponents/IntegerPositiveComponent';

type FormularVenitInputsProps = {
  id: number;
  venitBrut: string;
  cheltuieli: string;
  venitNet: string;
  pierdereAnuala: string;
  pierderePrecedenta: string;
  pierdereCompensata: string;
  venitImpozabil: string;
  venitRedus: string;
  impozitDatorat: string;

};

export default function FormularVenitInputs({
  id,
  venitBrut,
  cheltuieli,
  venitNet,
  pierdereAnuala,
  pierderePrecedenta,
  pierdereCompensata,
  venitImpozabil,
  venitRedus,
  impozitDatorat,
}: FormularVenitInputsProps) {
  const { inputChange } = useContext(AppContext);
  // Remove the unused prevValues ref since the related code is commented out

  // Memoize calculations to prevent infinite loops
  const calculateNetIncome = useCallback(() => {
    const brutNum = parseInt(venitBrut) || 0;
    const cheltuieliNum = parseInt(cheltuieli) || 0;
    const difference = brutNum - cheltuieliNum;

    if (brutNum === 0 && cheltuieliNum === 0) {
      return {
        venitNet: '',
        pierdereAnuala: ''
      };
    }

    if (difference > 0) {
      return {
        venitNet: difference.toString(),
        pierdereAnuala: ''
      };
    }

    if (difference < 0) {
      return {
        venitNet: '',
        pierdereAnuala: Math.abs(difference).toString()
      };
    }

    return {
      venitNet: '0',
      pierdereAnuala: ''
    };
  }, [venitBrut, cheltuieli]);

  const calculateTaxableIncome = useCallback(() => {
    const netIncome = parseInt(venitNet) || 0;
    const compensatedLoss = parseInt(pierdereCompensata) || 0;

    if (netIncome <= 0) {
      return {
        venitImpozabil: '',
        impozitDatorat: ''
      };
    }

    const taxableIncome = Math.max(0, netIncome - compensatedLoss);
    const baseForTax = parseInt(venitRedus) || taxableIncome;
    const taxDue = Math.floor(baseForTax * 0.1);

    return {
      venitImpozabil: taxableIncome.toString(),
      impozitDatorat: taxDue.toString()
    };
  }, [venitNet, pierdereCompensata, venitRedus]);

  // First useEffect for net income calculations
  useEffect(() => {
    const results = calculateNetIncome();
    if (results.venitNet !== venitNet) {
      inputChange('venitNet', results.venitNet, id);
    }
    if (results.pierdereAnuala !== pierdereAnuala) {
      inputChange('pierdereAnuala', results.pierdereAnuala, id);
    }
  }, [calculateNetIncome, id, venitNet, pierdereAnuala]);

  // Second useEffect for taxable income calculations
  useEffect(() => {
    const results = calculateTaxableIncome();
    if (results.venitImpozabil !== venitImpozabil) {
      inputChange('venitImpozabil', results.venitImpozabil, id);
    }
    if (results.impozitDatorat !== impozitDatorat) {
      inputChange('impozitDatorat', results.impozitDatorat, id);
    }
  }, [calculateTaxableIncome, id, venitImpozabil, impozitDatorat]);


  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <IntegerPositiveComponent
            label='1. Venit brut'
            name='venitBrut'
            value={venitBrut}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='2. Cheltuieli deductibile, potrivit legii'
            name='cheltuieli'
            value={cheltuieli}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='3. Venit net anual(rd.1 - rd.2)/ Castig net anual'
            name='venitNet'
            value={venitNet}
            arrayId={id}
            readOnly={true}
          />
          <IntegerPositiveComponent
            label='4. Pierdere fiscala anuala (rd.2 - rd.1)/ Pierdere neta anuala'
            name='pierdereAnuala'
            value={pierdereAnuala}
            arrayId={id}
            readOnly={true}
          />
        </div>
        <div>
          <IntegerPositiveComponent
            label='5. Pierderi fiscale/ nete anuale reportate din anii precedenti'
            name='pierderePrecedenta'
            value={pierderePrecedenta}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='6. Pierdere fiscala compensata in anul de raportare'
            name='pierdereCompensata'
            value={pierdereCompensata}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='7. Venit/ castig net anual impozabil/ Venit net anual recalculat(rd.3  - rd.6)'
            name='venitImpozabil'
            value={venitImpozabil}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='8. Venit net anual impozabil redus'
            name='venitRedus'
            value={venitRedus}
            arrayId={id}
          />

        </div>
      </div>
      <div className='mt-4'>
        <IntegerPositiveComponent
          label='9. Impozit anual datorat/ Impozit pe venit datorat(rd.7 x 10% sau rd.8 x 10%)'
          name='impozitDatorat'
          value={impozitDatorat}
          arrayId={id}
        />
      </div>
    </>
  );
}
