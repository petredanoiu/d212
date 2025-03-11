import { listaJudete } from '@/utils/nomenclatoare';
import { useState } from 'react';
import InputComponent from '../uicomponents/InputComponent';
import type { Adresa, OptionType } from '@/types/types';
// import SelectComponent from '../uicomponents/SelectComponent';
import CountiesRoDropdownComponent from '../uicomponents/CountiesRoDropdownComponent';

type AddressProps = Adresa & {
  arrayId?: number;
};

export default function Address({
  apartament,
  bloc,
  codpostal,
  etaj,
  judet,
  localitate,
  numar,
  scara,
  strada,
  arrayId,
}: AddressProps) {
  const [judete] = useState<OptionType[]>(listaJudete);

  return (
    <div>
      <h2 className='text-xl font-semibold'>Adresă</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
        <InputComponent
          name='strada'
          type='text'
          label='Strada'
          value={strada}
          arrayId={arrayId}
        />
        <InputComponent
          name='numar'
          type='text'
          label='Număr'
          value={numar}
          arrayId={arrayId}
        />
        <InputComponent
          name='localitate'
          type='text'
          label='Localitate'
          value={localitate}
          arrayId={arrayId}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mt-2'>
        <InputComponent
          name='bloc'
          type='text'
          label='Bloc'
          value={bloc}
          arrayId={arrayId}
        />
        <InputComponent
          name='scara'
          type='text'
          label='Scara'
          value={scara}
          arrayId={arrayId}
        />
        <InputComponent
          name='etaj'
          type='text'
          label='Etaj'
          value={etaj}
          arrayId={arrayId}
        />
        <InputComponent
          name='apartament'
          type='text'
          label='Apartament'
          value={apartament}
          arrayId={arrayId}
        />
        <InputComponent
          name='codpostal'
          type='text'
          label='Cod Postal'
          value={codpostal}
          arrayId={arrayId}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
        {/* <SelectComponent
          label='Județ'
          name='judet'
          options={listaJudete}
          value={judet}
          arrayId={arrayId}
        /> */}
        <CountiesRoDropdownComponent
          label='Județ'
          name='judet'
          value={judet}
          arrayId={arrayId}
        />
      </div>
    </div>
  );
}
