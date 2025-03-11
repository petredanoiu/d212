import { generateXML, saveXML } from '@/utils/helper';
import LoadDraftButton from './LoadDraftButton';
import SaveDraftButton from './SaveDraftButton';
import { use } from 'react';
import { AppContext } from '@/app/applicationcontext-provider';
import { numeFisierXml } from '@/utils/nomenclatoare';

export default function XmlButtons() {
  const { elementeFormular } = use(AppContext);
  function saveDrafAction() {
    const content = generateXML(elementeFormular);
    saveXML(numeFisierXml, content);
  }
  return (
    <div className='flex items-center gap-4'>
      <form action={saveDrafAction}>
        <SaveDraftButton />
      </form>
      <LoadDraftButton />
    </div>
  );
}
