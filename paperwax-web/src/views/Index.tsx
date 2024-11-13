import { useQuery } from '@tanstack/react-query'
import { getProcess } from '../api/ProcessApi'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import formatDate from '../utils/formatDate'

const processType = {
    PRINTING: 'Impresión', 
    PARAFFIN: 'Parafinado', 
    CUT: 'Corte', 
    PACKAGING: 'Empaquetado'
}

export default function Index() {
    const { data, isLoading } = useQuery({
        queryKey: ['process'], 
        queryFn: getProcess
    })

    if(isLoading) return <Loader />
    
    console.log(data)

    return (
        <>
            <h1 className='text-3xl font-semibold'>Dashboard</h1>
            <p>En esta sección, podrá ver información general de las operaciones actuales de la empresa</p>

            <div className='mt-6' id='process'>
                <div className='flex justify-between items-end border-b pb-2'>
                    <h2 className='text-2xl'>Procesos activos</h2>
                    
                    <Link to={'/processes/register'} className='text-blue-600 font-semibold'>+ Registrar Proceso</Link>
                </div>

                {data?.length ? (
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Tipo</th>
                                <th>Producto</th>
                                <th>Bobinado</th>
                                <th>Inicio</th>
                                <th>Finalizado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.map(data => (
                                <tr key={data?.id}>
                                    <td className='capitalize'>{data?.id}</td>
                                    <td className='capitalize'>{processType[data?.type]}</td>
                                    <td className='capitalize'>{data.product.name}</td>
                                    <td className='capitalize'>{data?.roll_material?.lot + "-" + data?.roll_material?.lot_id}</td>
                                    <td className='capitalize'>{formatDate(data?.start_time)}</td>
                                    <td 
                                        className={`capitalize ${data?.end_time ? 'bg-green-100' : 'bg-red-200 text-black'}`}
                                    >{data?.end_time ? formatDate(data?.end_time) : 'Sin terminar'}</td>
                                    <td>
                                        <div>
                                            <Link to={`/processes/edit/${data?.id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='text-center mt-5'>
                        <p className='text-zinc-400 text-xl font-semibold'>No hay procesos activos</p>
                        <Link to={'/processes/register'} className='text-blue-600 font-semibold text-xl'>+ Registrar Proceso</Link>
                    </div>
                )}
            </div>

            <div>
                
            </div>
        </>
    )
}
