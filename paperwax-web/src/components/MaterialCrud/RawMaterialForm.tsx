import { useQuery } from '@tanstack/react-query'
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { RawMaterialCreate } from "../../types"
import { getMaterialTypes } from '../../api/MaterialApi'
import Loader from '../Loader'

type RawMaterialFormProps = {
    register: UseFormRegister<RawMaterialCreate>
    errors: FieldErrors<RawMaterialCreate>
}

export default function RawMaterialForm({ register, errors } : RawMaterialFormProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['raw-materials'], 
        queryFn: getMaterialTypes
    })

    return (
        <>
            <div>
                <label className="text-lg font-semibold" htmlFor="name">Nombre del material</label> 
                <input 
                    className="p-2 rounded w-full"
                    type="text" 
                    id="name"
                    placeholder="Nombre del material"
                    {...register("name", {
                        required: "El nombre es obligatorio"
                    })}
                />

                {errors.name && (
                    <p className='text-red-500 text-start mt-2 rounded'>{errors.name.message}</p>
                )}

            </div>
        
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-4">
                <div className="mt-2">
                    <label className="text-lg font-semibold" htmlFor="stock">Stock Actual</label> 
                    <input 
                        className="p-2 rounded w-full"
                        type="number" 
                        id="stock"
                        placeholder="Stock actual"
                        {...register("stock", {
                            valueAsNumber: true
                        })}
                    />
                </div>

                <div className="mt-2">
                    <label className="text-lg font-semibold" htmlFor="unit">Unidad de medida</label> 
                    <select 
                        id="unit"
                        className="p-2 rounded w-full"
                        {...register("unit")}
                    >
                        <option value="KILOGRAMS">Kg</option>
                        <option value="LITERS">L</option>
                    </select>
                </div>
                
                <div className="mt-2">
                    <label className="text-lg font-semibold" htmlFor="amount">Cantidad por unidad</label> 
                    <input 
                        className="p-2 rounded w-full"
                        type="number" 
                        id="amount"
                        placeholder="Cantidad por unidad"
                        {...register("amount", {
                            valueAsNumber: true
                        })}
                    />
                </div>
                
                {isLoading ? <Loader /> : (
                    <div className="mt-2">
                        <label className="text-lg font-semibold" htmlFor="type_id">Tipo de material</label> 
                        <select 
                            id="type_id"
                            className="p-2 rounded w-full capitalize"
                            {...register("type_id", {
                                valueAsNumber: true
                            })}
                        >
                            {data?.map(type => (
                                <option key={type.id} value={type.id} className='capitalize'>{type.description}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <input type="submit" value="Registrar Material" className='p-2 bg-blue-600 rounded text-white font-semibold mt-4 hover:bg-blue-700 transition-colors cursor-pointer' />
        </>
    )
}
