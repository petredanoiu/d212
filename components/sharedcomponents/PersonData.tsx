import Cif from '../uicomponents/Cif';
import InputComponent from '../uicomponents/InputComponent';
import InputObligatoriuComponent from '../uicomponents/InputObligatoriuComponent';

type PersonDataProps = {
  initialaTata: string;
  nume: string;
  prenume: string;
  cif: string;
  arrayId?: number;
};

export default function PersonData({
  initialaTata,
  nume,
  prenume,
  cif,
  arrayId,
}: PersonDataProps) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-2'>
        <InputObligatoriuComponent
          name='nume'
          label='Nume'
          type='text'
          value={nume}
          arrayId={arrayId}
        />
        <InputComponent
          name='initialaTata'
          label='Initiala Tatalui'
          type='text'
          value={initialaTata}
          arrayId={arrayId}
        />
        <InputObligatoriuComponent
          name='prenume'
          label='Prenume'
          type='text'
          value={prenume}
          arrayId={arrayId}
        />
        <Cif value={cif} arrayId={arrayId} />
      </div>
    </div>
  );
}
