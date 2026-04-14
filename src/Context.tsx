import { createContext, ReactNode } from 'react';
import useLaborerData from './services/useLaborerData';

export type DataContextType = ReturnType<typeof useLaborerData>;

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const laborerData = useLaborerData();

  return (
    <DataContext.Provider value={laborerData}>
      {children}
    </DataContext.Provider>
  );
};