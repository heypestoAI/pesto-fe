import * as XLSX from 'xlsx';

export const validateExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        console.log(data);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Validate number of sheets
        if (workbook.SheetNames.length !== 4) {
          reject(new Error('Excel file must contain exactly four sheets'));
          return;
        }
        
        // Add additional validation as needed
        
        resolve(workbook);
      } catch (error) {
        console.log(error);
        reject(new Error('Error processing file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsArrayBuffer(file);
  });
};

export const validateCSVFile = (file) => {
  // Add CSV validation logic here
  return Promise.resolve(true);
}; 