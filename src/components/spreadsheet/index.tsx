import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Row from '../row';
import { evalExpression } from '../../utils/formula';
import { useAutoSave } from '../../hooks/useAutoSave';
import { ISpreadSheetProps, ICellData } from '../../types/spreadsheet';

const SpreadSheet: React.FC<ISpreadSheetProps> = ({ columns = 3, searchValue }) => {
  const [data, setData] = useState<ICellData[][]>(() =>
    Array.from({ length: 1 }, () =>
      Array.from({ length: columns }, () => ({ value: '', evalExp: '', error: false }))
    )
  );

  const [hasChanges, setHasChanges] = useState(false);
  const { loading, statusMessage } = useAutoSave(data, hasChanges, setHasChanges);

  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>(data.map(() => new Array(columns).fill(null)));

  const handleCellChange = useCallback((rowIndex: number, colIndex: number, value: string) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData[rowIndex][colIndex].evalExp = value;
    setData(updatedData);
    setHasChanges(true);
  }, [data]);

  const handleCellBlur = useCallback((rowIndex: number, colIndex: number) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    const cell = updatedData[rowIndex][colIndex];
    if (cell.evalExp.startsWith('=')) {
      const result = evalExpression(cell.evalExp.slice(1), updatedData);
      if (result === 'ERROR') {
        cell.value = '';
        cell.error = true;
      } else {
        cell.value = result;
        cell.error = false;
      }
    } else {
      cell.value = cell.evalExp;
      cell.error = false;
    }
    setData(updatedData);
    setHasChanges(true);
  }, [data]);

  const displayedData = useMemo(() => {
    return !searchValue ? data : data.filter(row => row.some(cell => cell.value.includes(searchValue)));
  }, [data, searchValue]);

  const addNew = () => {
    const newRow = Array.from({ length: columns }, () => ({ value: '', evalExp: '', error: false }));
    setData(prevData => [...prevData, newRow]);
    inputRefs.current.push(new Array(columns).fill(null));
  };

  return (
    <div className='w-full h-full overflow:hidden flex flex-col'>
      <div className='flex gap-2 p-2'>
        <div className='bg-gray-medium rounded-md h-full items-center flex'>
          <p className='min-w-[50px]'>
            NO
          </p>
        </div>
        <div className="grid grid-cols-3 w-full bg-gray-medium py-3 rounded-md">
          {[...Array(columns)].map((_, idx) => (
            <p className="col-span-1" key={idx}>{String.fromCharCode(65 + idx)}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto h-full p-1">
        {displayedData.map((rowData, rowIndex) => (
          <Row
            key={rowIndex}
            rowData={rowData}
            rowIndex={rowIndex}
            handleCellChange={handleCellChange}
            handleCellBlur={handleCellBlur}
          />
        ))}
      </div>
      <button className='bg-gray-medium rounded-md p-2 items-center mt-2 click hover:shadow-10' onClick={addNew}>
        Add
      </button>
      <>{loading && console.log("server status", statusMessage)}</>
    </div>
  );
};

export default SpreadSheet;
