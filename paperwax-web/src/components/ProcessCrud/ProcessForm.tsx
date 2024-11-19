import { useQuery } from '@tanstack/react-query'
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ProcessCreate } from "../../types"
import { getRolls } from '../../api/MaterialApi'
import { getProducts } from '../../api/ProductApi'
import Loader from '../Loader'

type ProcessFormProps = {
    register: UseFormRegister<ProcessCreate>
    errors: FieldErrors<ProcessCreate>
}

export default function ProcessForm({ register, errors } : ProcessFormProps) {
    const { data: products, isLoading: productLoading } = useQuery({
        queryKey: ['products'], 
        queryFn: getProducts
    })
    const { data: rolls, isLoading: rollLoading } = useQuery({
        queryKey: ['roll_materials'], 
        queryFn: getRolls
    })

    if(productLoading || rollLoading) return <Loader />

    return (
        <>
            <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-4'>
                <div>
                    <label className="text-lg font-semibold" htmlFor="product_id">Producto</label> 
                    <select
                        className="p-2 rounded w-full"
                        id="product_id"
                        {...register("product_id", {
                            required: "El producto es obligatorio"
                        })}
                    >
                        <option value="0">Seleccione un producto</option>
                        {products?.map(product => (
                            <option value={product.id} key={product.id}>{product.name}</option>
                        ))}
                    </select>

                    {errors.product_id && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.product_id.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-lg font-semibold" htmlFor="type">Proceso</label> 
                    <select
                        className="p-2 rounded w-full"
                        id="type"
                        {...register("type", {
                            required: "El tipo es obligatorio"
                        })}
                    >
                        <option value="0">Seleccione un proceso</option>
                        <option value="PRINTING">Impresión</option>
                        <option value="PARAFFIN">Parafinado</option>
                        <option value="CUT">Corte</option>
                        <option value="PACKAGING">Empaquetado</option>
                    </select>

                    {errors.product_id && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.product_id.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-lg font-semibold" htmlFor="roll_id">Bobinado</label> 
                    <select
                        className="p-2 rounded w-full"
                        id="roll_id"
                        {...register("roll_material_id", {
                            required: "El bobinado es obligatorio"
                        })}
                    >
                        <option value="0">Seleccione un rollo</option>
                        {rolls?.map(roll => (
                            <option key={roll.id} value={roll.id}>{roll.lot + "-" + roll.lot_id}</option>
                        ))}
                    </select>

                    {errors.product_id && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.product_id.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-lg font-semibold" htmlFor="initial_weight">Peso inicial</label> 
                    <input 
                        className="p-2 rounded w-full"
                        type="number" 
                        id="initial_weight"
                        placeholder="Peso inicial"
                        {...register("initial_weight", {
                            required: "El peso inicial es obligatorio"
                        })}
                    />

                    {errors.initial_weight && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.initial_weight.message}</p>
                    )}
                </div>
            </div>

            <input type="submit" className='p-2 bg-blue-600 rounded text-white font-semibold mt-4 hover:bg-blue-700 transition-colors cursor-pointer' value="Registrar Proceso" />
        </>
    )
}
