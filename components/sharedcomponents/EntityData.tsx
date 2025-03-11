import Cif from '../uicomponents/Cif';
import InputComponent from '../uicomponents/InputComponent';
import InputObligatoriuComponent from '../uicomponents/InputObligatoriuComponent';

type EntityDataProps = {
  denumire: string;
  iban: string;
  cif: string;
  isIban: boolean;
  arrayId?: number;
};

export default function EntityData({
  denumire,
  iban,
  cif,
  isIban,
  arrayId,
}: EntityDataProps) {
  return (
    <div>
      <div
        className={`grid grid-cols-1 md:${
          isIban ? 'grid-cols-3' : 'grid-cols-2'
        } gap-4 mt-2`}
      >
        <InputObligatoriuComponent
          name='denumire'
          label='Denumire'
          type='text'
          value={denumire}
          arrayId={arrayId}
        />
        <Cif value={cif} arrayId={arrayId} />
        {isIban ? (
          <InputComponent
            name='iban'
            type='text'
            label='IBAN'
            value={iban}
            arrayId={arrayId}
          />
        ) : undefined}
      </div>
    </div>
  );
}
