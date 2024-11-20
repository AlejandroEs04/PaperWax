import { useState } from 'react';
import { exportToExcel } from '../utils/exportToExcel';
import { getPrintProcess } from '../api/ProcessApi';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { ProcessType } from '../types';

type DownloadButtonProps = {
  onHide: () => void
}

export const DownloadButton = ({onHide} : DownloadButtonProps) => {
    const [month, setMonth] = useState<string>(`${new Date().getFullYear()}-${+new Date().getMonth() + 1}`);
    const [type, setType] = useState<ProcessType['type']>('PRINTING')
    const [isLoading, setIsLoading] = useState(false);
  
    const handleDownload = async() => {
      setIsLoading(true)

      if (!month) {
        alert('Please enter a valid month.');
        return;
      }

      try {
        const data = await getPrintProcess(type, month)
        if(data) exportToExcel(data!, `Producttion_${type}`)
      } catch (error) {
          toast.error('Hubo un error')
      } finally {
        setIsLoading(false)
        onHide()
      }
    };

    if(isLoading) return <Loader />
  
    return (
      <div className='flex gap-2 mt-1'>
        <select
          value={type}
          className='p-2 rounded w-full text-sm'
          onChange={(e) => setType(e.target.value)}
        >
          <option value="PRINTING">Impresión</option>
          <option value="PARAFFIN">Parafinado</option>
          <option value="CUT">Corte</option>
          <option value="PACKAGING">Empaquetado</option>
        </select>

        <input
          className='p-2 rounded w-full text-sm'
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (e.g., 2024-11)"
        />
        <button 
          onClick={handleDownload} 
          disabled={isLoading}
          className='p-2 bg-blue-600 rounded text-white text-sm font-semibold mt-1 hover:bg-blue-700 transition-colors cursor-pointer'
        >
          Descargar
        </button>

        <button 
          onClick={onHide} 
          disabled={isLoading}
          className='p-2 bg-red-600 rounded text-white text-sm font-semibold mt-1 hover:bg-red-700 transition-colors cursor-pointer'
        >
          Cancelar
        </button>
      </div>
    );
  };