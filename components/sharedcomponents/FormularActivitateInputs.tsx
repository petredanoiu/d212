import CodCaenDropdownComponent from '../uicomponents/CodCaenDropdownComponent';
import DateInputComponent from '../uicomponents/DateInputComponent';
import IntegerPositiveComponent from '../uicomponents/IntegerPositiveComponent';
import SelectComponent from '../uicomponents/SelectComponent';
import TextAreaComponent from '../uicomponents/TextAreaComponent';
import TextInputComponent from '../uicomponents/TextInputComponent';

type FormularActivitateInputsProps = {
  id: number;
  categorieVenit: string;
  determinareVenit: string;
  formaOrganizare: string;
  nomenclatorCAEN: string;
  dateIdentificareSediu: string;
  numarDocument: string;
  dataDocument: string;
  dataIncepere: string;
  dataIncetare: string;
  zileScutire: string;
};

export default function FormularActivitateInputs({
  id,
  categorieVenit,
  determinareVenit,
  formaOrganizare,
  nomenclatorCAEN,
  dateIdentificareSediu,
  numarDocument,
  dataDocument,
  dataIncepere,
  dataIncetare,
  zileScutire,
}: FormularActivitateInputsProps) {
  return (
    <>
      <div className='mt-4'>
        {/* la options elemenetele trebuie sa fie de tip {id:string, name: string} este Predefinit tipu OptionType */}
        <SelectComponent
          label='Categoria de venit'
          name='categorieVenit'
          value={categorieVenit}
          arrayId={id}
          options={[
            {
              id: 'activitati_independente',
              name: '1.Activități independente',
            },
            {
              id: 'proprietate_intelectuala',
              name: '2.Drepturi de proprietate intelectuala',
            },
            {
              id: 'cedarea_folosintei_bunurilor',
              name: '3.Cedarea folosintei bunurilor, altele decat cele de la punctul 4',
            },
            {
              id: 'cedarea_folosintei_bunurilor_turistic',
              name: '4.Cedarea folosintei bunurilor, in scop turistic',
            },
            { id: 'activitati_agricole', name: '5.Activitati agricole' },
            { id: 'silvicultura', name: '6.Silvicultura' },
            { id: 'piscicutura', name: '7.Piscicultura' },
            {
              id: 'transfer_valori',
              name: '8.Transferul titlurilor de valoare si orice alte operatiuni cu instrumente financiare, inclusiv instrumente financiare derivate, precum si transferul aurului de investitii',
            },
            {
              id: 'alte_surse',
              name: '9.Alte surse definite conform articolului 114 din Codul fiscal',
            },
          ]}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <SelectComponent
            label='Determinarea venitului net'
            name='determinareVenit'
            value={determinareVenit}
            arrayId={id}
            options={[
              { id: 'real', name: '1.Sistem real' },
              { id: 'norma', name: '2.Cote forfetare de cheltuieli' },
            ]}
          />
          <SelectComponent
            label='Forma de organizare'
            name='formaOrganizare'
            value={formaOrganizare}
            arrayId={id}
            options={[
              { id: 'individual', name: '1.Individual' },
              {
                id: 'asociere',
                name: '2.Asociere fara personalitate juridica',
              },
              {
                id: 'entitate_transparenta_fiscala',
                name: '3.Entitati supuse regimului transparentei fiscale',
              },
            ]}
          />
          {/* <SelectComponent
            label='Forma de organizare (cod CAEN)'
            name='nomenclatorCAEN'
            value={nomenclatorCAEN}
            arrayId={id}
            options={[{ id: '1', name: 'test' }]}
          /> */}
          <CodCaenDropdownComponent
            label='Forma de organizare (cod CAEN)'
            name='nomenclatorCAEN'
            value={nomenclatorCAEN}
            arrayId={id}
          />

          <TextAreaComponent
            label='Sediul/Date de identificare a bunului pentru care se cedează folosința'
            name='dateIdentificareSediu'
            value={dateIdentificareSediu}
            arrayId={id}
          />
          <TextInputComponent
            label='Numărul documentului de autorizare/Contractul de asociere/închiriere'
            name='numarDocument'
            value={numarDocument}
            arrayId={id}
          />
          <DateInputComponent
            label='Data document'
            name='dataDocument'
            value={dataDocument}
            arrayId={id}
          />
        </div>
        <div>
          <DateInputComponent
            label='Data începerii activității'
            name='dataIncepere'
            value={dataIncepere}
            arrayId={id}
          />
          <DateInputComponent
            label='Data încetării activității'
            name='dataIncetare'
            value={dataIncetare}
            arrayId={id}
          />
          <IntegerPositiveComponent
            label='Număr zile de scutire'
            name='zileScutire'
            value={zileScutire}
            arrayId={id}
            max={365}
            maxLength={3}
          />
        </div>
      </div>
    </>
  );
}
