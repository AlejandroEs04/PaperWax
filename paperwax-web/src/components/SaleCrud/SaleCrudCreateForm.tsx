import { useQuery } from '@tanstack/react-query'
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ProductType, SaleRegister } from "../../types"
import { getProducts } from '../../api/ProductApi'
import Loader from '../Loader'
import { useState } from 'react'
import { toast } from 'react-toastify'

type ProductSale = Pick<ProductType, 'name'> & {
    product_id: number 
    quantity: number 
    price: number 
    discount: number
}

type SaleCrudCreateFormProps = {
    register: UseFormRegister<SaleRegister>
    errors: FieldErrors<SaleRegister>
    products: ProductSale[]
    setProducts: React.Dispatch<React.SetStateAction<ProductSale[]>>
}

export default function SaleCrudCreateForm({ register, errors, products, setProducts } : SaleCrudCreateFormProps) {
    const [quantity, setQuantity] = useState(0)
    const [productId, setProductId] = useState(0)

    const { data: productsData, isLoading: productLoading } = useQuery({
        queryKey: ['products'], 
        queryFn: getProducts
    })

    const handleAddProduct = () => {
        if(products.filter(product => product.product_id === productId).length) {
            toast.info("El producto ya esta en la lista")
            return
        } else if(quantity <= 0) {
            toast.info("La cantidad debe ser mayor a 0")
            return
        }

        const product = productsData?.filter(product => product.id === productId)[0]

        setProducts([
            ...products, 
            {
                product_id: productId, 
                name: product?.name!, 
                price: +product?.price!, 
                quantity: quantity, 
                discount: 0
            }
        ])

        setProductId(0)
        setQuantity(0)
    }

    const handleDeleteProduct = (id: number) => setProducts(products.filter(product => product.product_id !== id))

    if(productLoading) return <Loader />

    return (
        <>
            <input 
                type="submit" 
                value="Generar Venta" 
                className='p-2 text-nowrap bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer'
            />

            <div className='grid md:grid-cols-2 gap-4 mt-2'>
                <div>
                    <label className="text-lg font-semibold" htmlFor="date">Fecha</label> 
                    <input 
                        className="p-2 rounded w-full"
                        type="date"
                        id='date'
                        {...register("date", {
                            required: "La fecha es obligatoria"
                        })}
                    />

                    {errors.date && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.date.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-lg font-semibold" htmlFor="customer">Cliente</label> 
                    <select 
                        className="p-2 rounded w-full"
                        id="customer"
                        {...register("customer_id", {
                            required: "El cliente es obligatorio"
                        })}
                    >
                        <option value="0">Seleccione un cliente</option>
                        <option value="1">Customer 1</option>
                    </select>

                    {errors.customer_id && (
                        <p className='text-red-500 text-start mt-2 rounded'>{errors.customer_id.message}</p>
                    )}
                </div>
            </div>  

            <div className='mt-5'>
                <div className='flex items-end gap-2'>
                    <div className='w-full'>
                        <label htmlFor="select_product">Seleccionar Producto</label>
                        <select value={productId} onChange={e => setProductId(+e.target.value)} id='select_product' className='p-2 rounded w-full'>
                            <option value="0">Seleccione un producto</option>
                            {productsData?.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='w-1/5'>
                        <label>Cantidad</label>
                        <input value={quantity} onChange={e => setQuantity(+e.target.value)} className='p-2 rounded w-full' type="number" placeholder='Cantidad de lotes' />
                    </div>
                    
                    <div>
                        <button onClick={handleAddProduct} className='p-2 text-nowrap bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer' type="button">Agregar Producto</button>
                    </div>
                </div>
            </div>   

            {products.length ? (
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product.product_id}>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div>
                                        <button className='bg-red-500 py-0.5 px-2 rounded text-white' type='button' onClick={() => handleDeleteProduct(product.product_id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='flex justify-center mt-5'>
                    <label htmlFor="select_product" className='font-bold text-slate-400 text-lg'>Aún no hay productos, haga click aqui para agregar un producto</label>
                </div>
            )}   
        </>
    )
}
