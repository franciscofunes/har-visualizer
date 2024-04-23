import { useState } from 'react';
import ExcelJS from 'exceljs';
import { columnDefs } from '../constants/agGridDefs';
import { HarDataRow } from '../types/HarData';

const useExcelExport = () => {
  const [excelErrorMessage, setErrorMessage] = useState<string | null>(null);

  const exportToExcel = (data: HarDataRow[], harFile: File | null) => {
    if (data.length === 0) {
      setErrorMessage('No data available to export');
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const headerRow = worksheet.addRow(columnDefs.map((colDef) => colDef.headerName));
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.border = { bottom: { style: 'thin' } };
      });

      data.forEach((rowData) => {
        const values = columnDefs.map((colDef) => {
          // Check if the field exists in rowData and has a value
          const value = rowData[colDef.field as keyof HarDataRow];
          return value !== undefined ? value : ''; // Provide default value if undefined
        });
        const row = worksheet.addRow(values);
        row.eachCell((cell) => {
          cell.border = { bottom: { style: 'thin' } };
        });
      });      

      const excelFileName = harFile ? `${harFile.name.replace('.har', '')}_output.xlsx` : 'output.xlsx';

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = excelFileName;

        link.click();
      });
    } catch (error) {
      console.error('Error exporting Excel:', error);
      setErrorMessage('Error exporting Excel');
    }
  };

  return { exportToExcel, excelErrorMessage };
};

export default useExcelExport;
