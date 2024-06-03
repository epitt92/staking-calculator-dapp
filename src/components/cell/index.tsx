import React, { useState } from 'react';
import { ICellData } from '../../types/spreadsheet';
import editIcon from '../../assets/img/edit.svg';

interface CellProps {
  cellData: ICellData;
  index: number;
  onChange: (value: string) => void;
  onBlur: () => void;
  onFocus: () => void;
}

const Cell: React.FC<CellProps> = ({ cellData, index, onChange, onBlur, onFocus }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className='py-1'>
      <div className={`w-full bg-[transparent] h-[28px] border-opacity-30 border-[black] flex items-center p-2 ${index !== 0 ? 'border-l-2' : 'border-l-0'}`}>
        {editing ? (
          <input
            type="text"
            value={cellData.evalExp}
            autoFocus
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => {
              onBlur();
              setEditing(false);
            }}
            onFocus={onFocus}
            className="text-center w-full outline-none bg-[transparent]"
          />
        ) : (
          <div className="flex gap-1 w-full text-center relative">
            {!!cellData.value && <span className="w-full">{index === 0 ? `$${cellData.value}` : index === 1 ? `${cellData.value}%` : cellData.value}</span>}
            <button className="edit-icon absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setEditing(true)}>
              <img src={editIcon} alt='edit-icon' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cell;
