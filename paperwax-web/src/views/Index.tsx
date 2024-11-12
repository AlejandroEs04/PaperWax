import { useQuery } from '@tanstack/react-query'
import { getProcess } from '../api/ProcessApi'
import Loader from '../components/Loader'

export default function Index() {
    const { data, isLoading } = useQuery({
        queryKey: ['process'], 
        queryFn: getProcess
    })

    if(isLoading) return <Loader />

    return (
        <>
            <h1 className='text-3xl font-semibold'>Dashboard</h1>
            <p>En esta sección, podrá ver información general de las operaciones actuales de la empresa</p>

            <div className='mt-6'>
                <h2 className='text-2xl'>Procesos activos</h2>

                <div>
                    
                </div>
            </div>

            <div>
                
            </div>
        </>
    )
}
