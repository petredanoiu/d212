import { useContext, useEffect, useRef, useCallback } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import IntegerPositiveComponent from '../uicomponents/IntegerPositiveComponent';

type FormularVenitStrainatateInputsProps = {
  id: number;
  venitBrutStrainatate: string;
  cheltuieliStrainatate: string;
  venitNetStrainatate: string;
  pierdereAnualaStrainatate: string;
  pierderePrecedentaStrainatate: string;
  pierdereCompensataStrainatate: string;
  venitImpozabilStrainatate: string;
  //impozitDatoratStrainatate: string;
  impozitDatoratInRomania: string;
  impozitPlatitStrainatate: string;
  creditFiscal: string;
  diferentaImpozitDePlata: string;
};

export default function FormularVenitStrainatateInputs({
  id,
  venitBrutStrainatate,
  cheltuieliStrainatate,
  venitNetStrainatate,
  pierdereAnualaStrainatate,
  pierderePrecedentaStrainatate,
  pierdereCompensataStrainatate,
  venitImpozabilStrainatate,
  //impozitDatoratStrainatate,
  impozitDatoratInRomania,
  impozitPlatitStrainatate,
  creditFiscal,
  diferentaImpozitDePlata,
}: FormularVenitStrainatateInputsProps) {
  const { inputChange } = useContext(AppContext);
  const prevValues = useRef({
    impozitDatoratInRomania,
    impozitPlatitStrainatate,
    creditFiscal
  });

  // Memoize calculations to prevent infinite loops
  const calculateNetIncome = useCallback(() => {
    const brutNum = parseInt(venitBrutStrainatate) || 0;
    const cheltuieliNum = parseInt(cheltuieliStrainatate) || 0;
    const difference = brutNum - cheltuieliNum;

    if (brutNum === 0 && cheltuieliNum === 0) {
      return {
        venitNetStrainatate: '',
        pierdereAnualaStrainatate: ''
      };
    }

    if (difference > 0) {
      return {
        venitNetStrainatate: difference.toString(),
        pierdereAnualaStrainatate: ''
      };
    }

    if (difference < 0) {
      return {
        venitNetStrainatate: '',
        pierdereAnualaStrainatate: Math.abs(difference).toString()
      };
    }

    return {
      venitNetStrainatate: '0',
      pierdereAnualaStrainatate: ''
    };
  }, [venitBrutStrainatate, cheltuieliStrainatate]);

  const calculateTaxableIncome = useCallback(() => {
    const netIncome = parseInt(venitNetStrainatate) || 0;
    const compensatedLoss = parseInt(pierdereCompensataStrainatate) || 0;

    if (netIncome <= 0) {
      return {
        venitImpozabilStrainatate: '',
        diferentaImpozitDePlata: ''
      };
    }

    const taxableIncome = Math.max(0, netIncome - compensatedLoss);
    const venitRedusNum = parseInt(venitImpozabilStrainatate) || 0;  // renamed to indicate number type
    const baseForTax = venitRedusNum || taxableIncome;  // using the renamed variable
    const taxDue = Math.floor(baseForTax * 0.1);

    return {
      venitImpozabilStrainatate: taxableIncome.toString(),
      diferentaImpozitDePlata: taxDue.toString()
    };
  }, [venitNetStrainatate, pierdereCompensataStrainatate, venitImpozabilStrainatate]);  // added missing dependency

  // First useEffect for net income calculations
  useEffect(() => {
    const results = calculateNetIncome();
    if (results.venitNetStrainatate !== venitNetStrainatate) {
      inputChange('venitNetStrainatate', results.venitNetStrainatate, id);
    }
    if (results.pierdereAnualaStrainatate !== pierdereAnualaStrainatate) {
      inputChange('pierdereAnualaStrainatate', results.pierdereAnualaStrainatate, id);
    }
  }, [calculateNetIncome, id, venitNetStrainatate, pierdereAnualaStrainatate]);

  // Second useEffect for taxable income calculations
  useEffect(() => {
    const results = calculateTaxableIncome();
    if (results.venitImpozabilStrainatate !== venitImpozabilStrainatate) {
      inputChange('venitImpozabilStrainatate', results.venitImpozabilStrainatate, id);
    }
    if (results.diferentaImpozitDePlata !== diferentaImpozitDePlata) {
      inputChange('diferentaImpozitDePlata', results.diferentaImpozitDePlata, id);
    }
  }, [calculateTaxableIncome, id, venitImpozabilStrainatate, diferentaImpozitDePlata]);

  useEffect(() => {
    if (prevValues.current.impozitDatoratInRomania !== impozitDatoratInRomania ||
      prevValues.current.creditFiscal !== creditFiscal) {

      const romanianTax = parseInt(impozitDatoratInRomania) || 0;
      const fiscalCredit = parseInt(creditFiscal) || 0;
      const taxDifference = Math.max(0, romanianTax - fiscalCredit);

      if (taxDifference.toString() !== diferentaImpozitDePlata) {
        inputChange('diferentaImpozitDePlata', taxDifference.toString(), id);
      }

      prevValues.current = {
        ...prevValues.current,
        impozitDatoratInRomania,
        impozitPlatitStrainatate,
        creditFiscal
      };
    }
  }, [impozitDatoratInRomania, creditFiscal, diferentaImpozitDePlata, id, inputChange]);

  // Add new useEffect for calculating credit fiscal
  useEffect(() => {
    if (prevValues.current.impozitPlatitStrainatate !== impozitPlatitStrainatate ||
      prevValues.current.impozitDatoratInRomania !== impozitDatoratInRomania) {

      const foreignTax = parseInt(impozitPlatitStrainatate) || 0;
      const romanianTax = parseInt(impozitDatoratInRomania) || 0;
      const calculatedCredit = Math.min(foreignTax, romanianTax);

      if (calculatedCredit.toString() !== creditFiscal) {
        inputChange('creditFiscal', calculatedCredit.toString(), id);
      }
    }
  }, [impozitPlatitStrainatate, impozitDatoratInRomania, creditFiscal, id, inputChange]);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <IntegerPositiveComponent
            label='1. Venit brut'
            name='venitBrutStrainatate'
            value={venitBrutStrainatate}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='2. Cheltuieli deductibile/alte sume deductibile'
            name='cheltuieliStrainatate'
            value={cheltuieliStrainatate}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='3. Venit net (rd.1-rd.2)/ Câștig net anual'
            name='venitNetStrainatate'
            value={venitNetStrainatate}
            arrayId={id}
            readOnly={true}
          />
          <IntegerPositiveComponent
            label='4. Pierdere fiscală anuală (rd.2. - rd.1.)/Pierdere netă anuală'
            name='pierdereAnualaStrainatate'
            value={pierdereAnualaStrainatate}
            arrayId={id}
            readOnly={true}
          />
          <IntegerPositiveComponent
            label='5. Pierderi fiscale/nete anuale reportate din anii precedenți'
            name='pierderePrecedentaStrainatate'
            value={pierderePrecedentaStrainatate}
            arrayId={id}
          />
        </div>
        <div>
          <IntegerPositiveComponent
            label='6. Pierdere fiscala compensata in anul de raportare'
            name='pierdereCompensataStrainatate'
            value={pierdereCompensataStrainatate}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='7. Venit/câștig net anual impozabil (rd.3-rd.6)'
            name='venitImpozabilStrainatate'
            value={venitImpozabilStrainatate}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='8. Impozit pe venit datorat în România'
            name='impozitDatoratInRomania'
            value={impozitDatoratInRomania}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='9. Impozit pe venit plătit în străinătate'
            name='impozitPlatitStrainatate'
            value={impozitPlatitStrainatate}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='10. Credit fiscal'
            name='creditFiscal'
            value={creditFiscal}
            arrayId={id}
            readOnly={true}
          />

        </div>
      </div>
      <IntegerPositiveComponent
        label='11. Diferență de impozit de plată (rd.8-rd.10)'
        name='diferentaImpozitDePlata'
        value={diferentaImpozitDePlata}
        arrayId={id}
        readOnly={true}
      />
    </>
  );
}
