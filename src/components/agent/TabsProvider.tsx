
import React, { createContext, useContext, ReactNode } from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};

interface TabsProviderProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ 
  value, 
  onValueChange, 
  children 
}) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      {children}
    </TabsContext.Provider>
  );
};
