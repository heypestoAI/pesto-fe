import { createContext, useContext, useState } from 'react';

const ExcelDataContext = createContext();

export function ExcelDataProvider({ children }) {
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExcelData = (data) => {
    setExcelData(data);
  };

  return (
    <ExcelDataContext.Provider 
      value={{
        excelData,
        loading,
        error,
        setLoading,
        setError,
        updateExcelData
      }}
    >
      {children}
    </ExcelDataContext.Provider>
  );
}

export function useExcelData() {
  const context = useContext(ExcelDataContext);
  if (context === undefined) {
    throw new Error('useExcelData must be used within an ExcelDataProvider');
  }
  return context;
} 