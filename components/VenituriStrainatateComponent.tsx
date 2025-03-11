import { VenituriStrainatateType } from '@/types/types';
import FormularActivitateStrainatateInputs from './sharedcomponents/FormularActivitateStrainatateInputs';
import FormularVenitStrainatateInputs from './sharedcomponents/FormularVenitStrainatateInputs';

export default function VenituriStrainatateComponent(
  props: VenituriStrainatateType
) {
  return (
    <div className='border p-4 rounded-md mt-4'>
      
      <h2 className='text-xl font-semibold mb-4'>
        Date privind activitatea desfasurata
      </h2>
      
      <FormularActivitateStrainatateInputs {...props} />
      <h2 className='text-xl font-semibold mb-4'>
        Date privind impozitul anual datorat
      </h2>
      <FormularVenitStrainatateInputs {...props} />
    </div>
  );
}
