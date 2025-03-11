'use client';
import { useFormStatus } from 'react-dom';
import Button from './Button';

export default function SaveDraftButton() {
  const { pending } = useFormStatus();
  const cssBut = pending
    ? 'opacity-30 px-4 bg-blue-600 text-white hover:bg-blue-700'
    : 'px-4 bg-blue-600 text-white hover:bg-blue-700';

  return (
    <Button
      title={pending ? 'Asteapta...' : 'Salveaza draft'}
      css={cssBut}
      disabled={pending}
    />
  );
}
