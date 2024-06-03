import React, { useState } from 'react';
import Cell from '../cell';
import { ICellData } from '../../types/spreadsheet';

interface RowProps {
  rowData: ICellData[];
  rowIndex: number;
  handleCellChange: (rowIndex: number, colIndex: number, value: string) => void;
  handleCellBlur: (rowIndex: number, colIndex: number) => void;
}

const Row: React.FC<RowProps> = ({ rowData, rowIndex, handleCellChange, handleCellBlur }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={`flex gap-2 items-center mt-1 hover:shadow-10 rounded-md ${focus ? 'shadow-10' : ''}`}>
      <p className={`min-w-[50px] p-2 pl-3 h-[37px] rounded-md ${rowData.some(cell => cell.error) ? 'bg-error border border-error bg-opacity-30' : 'bg-gray-light'}`}>
        {rowIndex + 1}
      </p>
      <div className={`grid grid-cols-3 w-full rounded-md ${rowData.some(cell => cell.error) ? 'bg-error border border-error bg-opacity-30' : 'bg-gray-light'}`}>
        {rowData.map((cellData, colIndex) => (
          <Cell
            key={colIndex}
            index={colIndex}
            cellData={cellData}
            onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
            onBlur={() => {
              handleCellBlur(rowIndex, colIndex);
              setFocus(false);
            }}
            onFocus={() => setFocus(true)}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
