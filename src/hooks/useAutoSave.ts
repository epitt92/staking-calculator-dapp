import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { delay } from '../utils/delay';
import { ICellData, ISaveResponse, IStatusResponse, IAxiosError } from '../types/spreadsheet';

export const useAutoSave = (data: ICellData[][], hasChanges: boolean, setHasChanges: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const saveData = useCallback(async () => {
    try {
      setLoading(true);
      setStatusMessage('Saving...');
      const csvData = data.map(row => row.map(cell => `"${cell.value}"`).join(',')).join('\n');
      const response = await axios.post<ISaveResponse>('http://localhost:8082/save', { data: csvData });

      if (response.data.status === 'IN_PROGRESS') {
        const { id, done_at } = response.data;
        if (id) {
          const doneAt = new Date(done_at!).getTime();
          const now = new Date().getTime();
          const waitTime = doneAt > now ? doneAt - now : 0;
          
          setStatusMessage('Save in progress...');
          await delay(waitTime);
          checkStatus(id);
        }
      } else {
        setStatusMessage('Save completed successfully.');
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
      setHasChanges(false);
    }
  }, [data]);

  const checkStatus = async (id: string) => {
    try {
      const response = await axios.get<IStatusResponse>(`http://localhost:8082/get-status?id=${id}`);
      if (response.data.status === 'DONE') {
        setStatusMessage('Save completed successfully.');
      } else {
        const { done_at } = response.data;
        const doneAt = new Date(done_at).getTime();
        const now = new Date().getTime();
        const waitTime = doneAt > now ? doneAt - now : 0;

        setStatusMessage('Save in progress...');
        await delay(waitTime);
        checkStatus(id);
      }
    } catch (error) {
      setStatusMessage('Error checking status.');
    }
  };

  const handleError = async (error: IAxiosError) => {
    if (error.response?.status === 500) {
      setStatusMessage('Error saving data. Retrying...');
      await delay(2000);
      saveData();
    } else {
      setStatusMessage('Unexpected error.');
    }
  };

  useEffect(() => {
    if (hasChanges) {
      saveData();
    }
  }, [data, hasChanges, saveData]);

  return { loading, statusMessage };
};
