import { createContext, ReactNode } from 'react';
import { useLaborers } from './Laborers/hooks/useLaborerData';

export type DataContextType = ReturnType<typeof useLaborers>;

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const laborerData = useLaborers();

  return (
    <DataContext.Provider value={laborerData}>
      {children}
    </DataContext.Provider>
  );
};