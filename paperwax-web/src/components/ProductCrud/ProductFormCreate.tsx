import { useQuery } from '@tanstack/react-query'
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ProductCreate } from "../../types"
import { getPapers } from '../../api/PaperApi'
import Loader from '../Loader'

type ProductFormCreate = {
    register: UseFormRegister<ProductCreate>
    errors: FieldErrors<ProductCreate>
}

export default function ProductFormCreate({ register, errors } : ProductFormCreate) {
    const { data, isLoading } = useQuery({
        queryKey: ['papers'], 
        queryFn: getPapers
    })

    return (
        <>
            <div className='grid md:grid-cols-3 gap-4'>
                <div>
                    <label className="text-lg font-semibold" htmlFor="name">Nombre del producto</label> 
                    <input 
                        className="p-2 rounded w-full"
                        type="text" 
                        id="name"
                        placeholder="Nombre del producto"
                        {...register("name", {
                            required: "El nombre es obligatorio"
                        })}
                    />

                    {errors.name && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.name.message}</p>
                    )}
                </div>

                {isLoading ? <Loader /> : (
                    <div>
                        <label className="text-lg font-semibold" htmlFor="paper_id">Tipo de papel</label> 
                        <select 
                            id="paper_id"
                            className="p-2 rounded w-full"
                            {...register("paper_id", {
                                valueAsNumber: true
                            })}
                        >
                            <option value="0">Seleccione un tipo de rollo</option>
                            {data?.map(type => (
                                <option key={type.id} value={type.id} className='capitalize'>{type.name}</option>
                            ))}
                        </select>
                        
                        {errors.paper_id && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.paper_id.message}</p>
                        )}
                    </div>
                )}

                <div>
                    <label className="text-lg font-semibold" htmlFor="stock">Stock del producto</label> 
                    <input 
                        className="p-2 rounded w-full"
                        type="number" 
                        id="stock"
                        placeholder="Nombre del producto"
                        {...register("quantity", {
                            required: "El stock es obligatorio", 
                            valueAsNumber: true
                        })}
                    />

                    {errors.quantity && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.quantity.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-lg font-semibold" htmlFor="description">Descripción del producto</label> 
                    <textarea 
                        id="description"
                        className='w-full rounded p-2'
                        placeholder="Descripcion del producto"
                        {...register("description", {
                            required: "La descripcion es obligatorio"
                        })}
                    ></textarea>

                    {errors.description && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.description.message}</p>
                    )}
                </div>
                
            </div>
            
            <input type="submit" value="Registrar Producto" className='p-2 bg-blue-600 rounded text-white font-semibold mt-2 hover:bg-blue-700 transition-colors cursor-pointer'/>
        </>
    )
}
