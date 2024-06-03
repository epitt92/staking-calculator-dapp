// import { Parser } from 'hot-formula-parser';
// import { ICellData } from '../types/spreadsheet';

// const parser = new Parser();

// export const evalExpression = (expression: string, data: ICellData[][]): string => {
//   parser.on('callCellValue', (cellCoord, done) => {
//     const { row, column } = cellCoord;
//     if (data[column.index] && data[column.index][row.index]) {
//       const cell = data[column.index][row.index];
//       done(Number(cell.value));
//     }
//   });
//     const parsed = parser.parse(expression);
    
//     if (parsed.error) {
//       console.error('Error parsing expression:', parsed.error);
//       return 'ERROR';
//     } else {
//       return parsed.result?.toString() || '';
//     }
// };


import { Parser } from 'hot-formula-parser';
import { ICellData } from '../types/spreadsheet';

const parser = new Parser();

export const evalExpression = (expression: string, data: ICellData[][]): string => {
  parser.on('callCellValue', (cellCoord, done) => {
    const { row, column } = cellCoord;
    const rowIndex = row.index + 1; // Convert to 1-based index
    const colIndex = column.index + 1; // Convert to 1-based index
    const cell = data[rowIndex - 1] && data[rowIndex - 1][colIndex - 1];
    if (cell) {
      done(colIndex!==2? Number(cell.value) : Number(cell.value)/100);
    } else {
      done(0);
    }
  });
  parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
    const startRowIndex = startCellCoord.row.index + 1;
    const startColIndex = startCellCoord.column.index + 1;
    const endRowIndex = endCellCoord.row.index + 1;
    const endColIndex = endCellCoord.column.index + 1;
    const values = [];
    for (let rowIndex = startRowIndex; rowIndex <= endRowIndex; rowIndex++) {
      const row = [];
      for (let colIndex = startColIndex; colIndex <= endColIndex; colIndex++) {
        const cell = data[rowIndex - 1] && data[rowIndex - 1][colIndex - 1];
        row.push(cell ? Number(cell.value) : 0);
      }
      values.push(row);
    }
    done(values);
  });

  const parsed = parser.parse(expression);
  
  if (parsed.error) {
    console.error('Error parsing expression:', parsed.error);
    return 'ERROR';
  } else {
    return parsed.result?.toString() || '';
  }
};

