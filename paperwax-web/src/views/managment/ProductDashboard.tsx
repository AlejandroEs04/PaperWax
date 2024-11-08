import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { getProducts } from '../../api/ProductApi'

export default function ProductDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['raw-materials'], 
        queryFn: getProducts
    })

    if(isLoading) return <Loader />

    return (
        <>
            <div className='flex justify-between items-end'>
                <div>
                    <h1 className='text-3xl font-semibold'>Productos</h1>
                    <p className='text-lg text-blue-600'>Administra los productos actuales</p>
                </div>
                <Link to={'register'} className='text-blue-600'>+ Registrar Producto</Link>
            </div>
            <hr />
            {data?.length ? (
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(material => (
                            <tr key={material.id}>
                                <td className='capitalize'>{material.id}</td>
                                <td className='capitalize'>{material.name}</td>
                                <td className='capitalize'>{material.description}</td>
                                <td className='capitalize'>{material.quantity}</td>
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
