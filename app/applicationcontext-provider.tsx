'use client';

import type { FormElements, PageModules } from '@/types/types';
import { defaultFormValues } from '@/utils/nomenclatoare';
import { createContext, useState } from 'react';

type AppContextType = {
  elementeFormular: FormElements;
  setElementeFormular: (elementeFormular: FormElements) => void;
  inputChange: (
    name: string,
    value: string | boolean,
    arrayId?: number
  ) => void;
  activeModule: PageModules;
  setActiveModule: (activeModule: PageModules) => void;
};

export const AppContext = createContext<AppContextType>({
  elementeFormular: defaultFormValues,
  setElementeFormular: () => {},
  inputChange: (name: string, value: string | boolean, arrayId?: number) => {},
  activeModule: 'dateIdentificare',
  setActiveModule: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elementeFormular, setElementeFormular] =
    useState<FormElements>(defaultFormValues);
  const [activeModule, setActiveModule] =
    useState<PageModules>('dateIdentificare');

  const inputChange = (
    name: string,
    value: string | boolean,
    arrayId?: number
  ) => {
    if (arrayId !== undefined) {
      const currentArray = elementeFormular[activeModule] as Array<{
        id: number;
      }>;
      const update = currentArray.map((item) =>
        item.id === arrayId ? { ...item, [name]: value } : item
      );
      setElementeFormular({
        ...elementeFormular,
        [activeModule]: update,
      });
    } else {
      setElementeFormular({
        ...elementeFormular,
        [activeModule]: {
          ...elementeFormular[activeModule],
          [name]: value,
        },
      });
    }
  };

  return (
    <AppContext
      value={{
        elementeFormular,
        setElementeFormular,
        inputChange,
        activeModule,
        setActiveModule,
      }}
    >
      {children}
    </AppContext>
  );
};
