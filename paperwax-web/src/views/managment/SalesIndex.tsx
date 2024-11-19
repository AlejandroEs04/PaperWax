import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getSales } from "../../api/SaleApi"
import Loader from "../../components/Loader"
import formatDate from "../../utils/formatDate"

const saleStatus = {
    ON_HOLD: 'En espera', 
    IN_PROGRESS: 'En progreso', 
    COMPLETED: 'Completo', 
    DELIVERED: 'Entregado', 
}

export default function SalesIndex() {
    const { data, isLoading } = useQuery({
        queryKey: ['sales'], 
        queryFn: getSales
    })

    if(isLoading) return <Loader />

    return (
        <>
            <div className='flex justify-between items-end mt-4'>
                <div>
                    <h1 className='text-3xl font-semibold'>Ventas</h1>
                    <p className='text-lg text-blue-600'>Administra las ventas del sistema</p>
                </div>

                <Link to={'register'} className='text-blue-600'>+ Agregar Venta</Link>
            </div>
            <hr />

            {data?.length ? (
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(sale => (
                            <tr key={sale.id}>
                                <td className='capitalize'>{sale.id}</td>
                                <td className='capitalize'>{formatDate(sale.date)}</td>
                                <td className='capitalize'>{sale.customer.name}</td>
                                <td 
                                    className={`
                                        ${sale.status === 'ON_HOLD' && 'bg-red-300'}    
                                        ${sale.status === 'IN_PROGRESS' && 'bg-amber-300'}    
                                        ${sale.status === 'COMPLETED' && 'bg-blue-300'}    
                                        ${sale.status ===  'DELIVERED' && 'bg-green-300'}    
                                    `}
                                >{saleStatus[sale.status]}</td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <Link to={'edit'} className="text-white bg-green-500 p-0.5 rounded hover:bg-green-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Link>

                                        <button className="text-white bg-red-500 p-0.5 rounded hover:bg-red-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='text-center mt-5'>
                    <p className='text-zinc-400 text-xl font-semibold'>No hay productos dados de alta</p>
                    <Link to={'register'} className='text-blue-600 font-semibold text-xl'>+ Registrar Producto</Link>
                </div>
            )}
        </>
    )
}
