import SelectComponent from '../uicomponents/SelectComponent';
import CountryDropdownComponent from '../uicomponents/CountryDropdownComponent';
//import TaxationMethodDropdownComponent from '../uicomponents/TaxationMethodDropdownComponent';
//import CheckboxComponent from '../uicomponents/CheckboxComponent';
import CheckBoxButton from '../uicomponents/CheckBoxButton';
import DateInputComponent from '../uicomponents/DateInputComponent';
type FormularActivitateStrainatateInputsProps = {
  id: number;
  categorieVenitStrainatate: string;
  dataIncepereStrainatate: string;
  dataIncetareStrainatate: string;
  taraVenit: string;
  evitareDublaImpunere: string;
  venitScutitAcordInternational: boolean; // Make sure it's boolean
};

export default function FormularActivitateStrainatateInputs({
  id,
  categorieVenitStrainatate,
  taraVenit,
  evitareDublaImpunere,
  venitScutitAcordInternational = false, // Add default value
  dataIncepereStrainatate,
  dataIncetareStrainatate
}: FormularActivitateStrainatateInputsProps) {
  return (
    <><div className='mt-4'>
      {/* la options elemenetele trebuie sa fie de tip {id:string, name: string} este Predefinit tipu OptionType */}
      <SelectComponent
        label='Categoria de venit'
        name='categorieVenitStrainatate'
        value={categorieVenitStrainatate}
        arrayId={id}
        options={[
          { id: 'activitati_independente', name: '1.Activități independente' },
          { id: 'proprietate_intelectuala', name: '2.Drepturi de proprietate intelectuală' },
          { id: 'cedarea_folosintei_bunurilor', name: '3.Cedarea folosinţei bunurilor' },
          { id: 'activitati_agricole', name: '4.Activităţi agricole' },
          { id: 'silvicultura', name: '5.Silvicultura' },
          { id: 'piscicutura', name: '6.Piscicultura' },
          { id: 'transfer_valori', name: '7.Transferul titlurilor de valoare si orice alte operatiuni cu instrumente financiare, inclusiv instrumente financiare derivate, precum si transferul aurului de investitii' },
          { id: 'renumeratii', name: '8.Remunerații/indemnizații ale membrilor consiliului de administrație/administratori/cenzori și alte venituri similare' },
          { id: 'salarii_romania', name: '9.Salarii plătite din România pentru activitatea desfăşurată în străinătate' },
          { id: 'dobanzi', name: '10.Dobânzi' },
          { id: 'pensii', name: '11.Pensii' },
          { id: 'premii', name: '12.Premii' },
          { id: 'dividente', name: '13.Dividende' },
          { id: 'jocuri_noroc', name: '14.Jocuri de noroc' },
          { id: 'transfer_proprietati_lt3', name: '15.1.Transferul proprietăţilor imobiliare din patrimoniul personal deținute o perioadă de până la 3 ani, inclusiv' },
          { id: 'transfer_proprietati_gt3', name: '15.2.Transferul proprietăţilor imobiliare din patrimoniul personal deținute o perioadă mai mare de 3 ani' },
          { id: 'transfer_mostenire', name: '16.Transferul proprietăţilor imobiliare din patrimoniul personal cu titlu de moştenire' },
          { id: 'lichidare_persoana_juridica', name: '17.Lichidarea unei persoane juridice' },
          { id: 'alte_venituri', name: '18.Alte venituri' },
        ]} />
    </div><div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <CountryDropdownComponent
            label='Țara în care s-a realizat venitul'
            name='taraVenit'
            value={taraVenit}
            arrayId={id} />
          <SelectComponent
            label='Metoda de evitare a dublei impuneri'
            name='evitareDublaImpunere'
            value={evitareDublaImpunere}
            arrayId={id}
            options={[
              { id: 'credit_fiscal', name: '1.Metoda creditului fiscal' },
              { id: 'scutire', name: '2.Metoda scutirii' },
            ]} />

          <CheckBoxButton
            label='Venit scutit în baza unui acord internațional la care România este parte'
            name='venitScutitAcordInternational'
            checked={venitScutitAcordInternational}
            arrayId={id} />
          <DateInputComponent
              label='Data începerii activității'
              name='dataIncepereStrainatate'
              value={dataIncepereStrainatate}
              arrayId={id} />
            <DateInputComponent
              label='Data încetării activității'
              name='dataIncetareStrainatate'
              value={dataIncetareStrainatate}
              arrayId={id} />
        </div>
      </div></>
  );
}
