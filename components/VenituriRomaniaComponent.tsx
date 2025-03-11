import { VenituriRomaniaType } from '@/types/types';
import FormularActivitateInputs from './sharedcomponents/FormularActivitateInputs';
import FormularVenitInputs from './sharedcomponents/FormularVenitInputs';

export default function VenituriRomaniaComponent(props: VenituriRomaniaType) {
  return (
    <div className='border p-4 rounded-md mt-4'>
      <h2 className='text-xl font-semibold mb-4'>
        Date privind activitatea desfasurata
      </h2>
      <FormularActivitateInputs {...props} />
      <h2 className='text-xl font-semibold mb-4'>
        Date privind impozitul anual datorat
      </h2>
      <FormularVenitInputs {...props} />
    </div>
  );
}
