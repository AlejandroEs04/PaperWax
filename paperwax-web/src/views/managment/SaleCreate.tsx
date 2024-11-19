import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { ProductType, SaleRegister } from "../../types"
import { formInputDate } from "../../utils/formatDate"
import SaleCrudCreateForm from '../../components/SaleCrud/SaleCrudCreateForm'
import { createSale } from "../../api/SaleApi"

type ProductSale = Pick<ProductType, 'name'> & {
    product_id: number 
    quantity: number 
    price: number 
    discount: number
}

export default function SaleCreate() {
    const [products, setProducts] = useState<ProductSale[]>([])

    const initialValues : SaleRegister = {
        customer_id: 0, 
        date: formInputDate(new Date().toISOString()), 
        products: [], 
        status: 'ON_HOLD'
    }

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: createSale, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            navigate('/sales')
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleForm = (data : SaleRegister) => mutate({ ...data, products: products })

    return (
        <>
            <h1 className='text-3xl font-semibold'>Registrar Venta</h1>
            <p className='text-lg text-blue-600'>Registra la información que se solicita para registrar venta</p>
            
            <form
                noValidate
                className="mt-2"
                onSubmit={handleSubmit(handleForm)} 
            >
                <SaleCrudCreateForm 
                    register={register}
                    errors={errors}
                    products={products}
                    setProducts={setProducts}
                />
            </form>
        </>
    )
}
