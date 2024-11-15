import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { getRolls } from '../api/MaterialApi'

export default function RollMaterialTable() {
    const { data, isLoading } = useQuery({
        queryKey: ['roll-materials'], 
        queryFn: getRolls
    })

    if(isLoading) return <Loader />

    if(data?.length) {
        return (
            <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Lote</th>
                        <th>Id</th>
                        <th>Peso</th>
                        <th>Papel</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.map(material => (
                        <tr key={material?.id}>
                            <td className='capitalize'>{material?.id}</td>
                            <td className='capitalize'>{material?.lot}</td>
                            <td className='capitalize'>{material?.lot_id}</td>
                            <td className='capitalize'>{material?.weight} Kg</td>
                            <td className='capitalize'>{material?.paper_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    } else {
        return (
            <div className='text-center mt-5'>
                <p className='text-zinc-400 text-xl font-semibold'>No hay rollos dados de alta</p>
                <Link to={'roll-materials/register'} className='text-blue-600 font-semibold text-xl'>+ Registrar Rollo</Link>
            </div>
        )
    }
}