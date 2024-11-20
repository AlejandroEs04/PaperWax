import { useQuery } from '@tanstack/react-query'
import { getMaterials } from '../../api/MaterialApi'
import Loader from '../../components/Loader'
import { useEffect, useState } from 'react'
import { RawMaterial } from '../../types'
import { Link } from 'react-router-dom'
import RollMaterialTable from '../../components/RollMaterialTable'

export default function MaterialInventory() {
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]) 

    const { data, isLoading } = useQuery({
        queryKey: ['raw-materials'], 
        queryFn: getMaterials
    })

    useEffect(() => {
        if(data?.length) {
            setRawMaterials(data?.filter(material => material.type_id !== 3))
        }
    }, [data])

    if(isLoading) return <Loader />

    if(data) return (
        <>
            <h1 className='text-3xl font-semibold'>Inventario de materiales</h1>
            <p className='text-lg text-blue-600'>Administra el inventario de las materias primas utilizadas</p>

            <div className='flex justify-between mt-4'>
                <h2 className='text-xl font-semibold'>Materias primas</h2>
                <Link to={'register'} className='text-blue-600'>+ Agregar Material</Link>
            </div>
            <hr />
            {rawMaterials.length ? (
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Stock</th>
                            <th colSpan={2}>Cantidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rawMaterials?.map(material => (
                            <tr key={material?.id}>
                                <td className='capitalize'>{material?.id}</td>
                                <td className='capitalize'>{material?.name}</td>
                                <td className='capitalize'>{material?.type?.description}</td>
                                <td className='capitalize'>{material?.stock}</td>
                                <td className='capitalize'>{material?.amount * material?.stock}</td>
                                <td className='capitalize'>Kg</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='text-center mt-5'>
                    <p className='text-zinc-400 text-xl font-semibold'>No hay materiales dados de alta</p>
                    <Link to={'register'} className='text-blue-600 font-semibold text-xl'>+ Registrar Material</Link>
                </div>
            )}

            <h2 className='text-xl mt-5 font-semibold'>Rollos registrados</h2>
            <hr />
            {/* {rollMaterials.length ? (
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Stock</th>
                            <th colSpan={2}>Cantidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rollMaterials?.map(material => (
                            <tr key={material?.id}>
                                <td className='capitalize'>{material?.id}</td>
                                <td className='capitalize'>{material?.name}</td>
                                <td className='capitalize'>{material?.type.description}</td>
                                <td className='capitalize'>{material?.stock}</td>
                                <td className='capitalize'>{material?.amount * material?.stock}</td>
                                <td className='capitalize'>Kg</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='text-center mt-5'>
                    <p className='text-zinc-400 text-xl font-semibold'>No hay materiales dados de alta</p>
                    <Link to={'register'} className='text-blue-600 font-semibold text-xl'>+ Agregar Material</Link>
                </div>
            )} */}

            <RollMaterialTable />
        </>
    )
}
