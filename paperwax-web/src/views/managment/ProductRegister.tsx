import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { ProductCreate } from "../../types"
import { createProduct } from "../../api/ProductApi"
import ProductFormCreate from "../../components/ProductCrud/ProductFormCreate"

export default function ProductRegister() {
    const initialValues : ProductCreate = {
        name: '', 
        description: '', 
        paper_id: 0, 
        quantity: 0
    }

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createProduct, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            navigate('/products')
        }
    })

    const handleForm = (data : ProductCreate) => mutate(data)

    return (
        <>
            <h1 className='text-3xl font-semibold'>Registrar Producto</h1>
            <p className='text-lg text-blue-600'>Registra la información del producto</p>
            
            <form
                noValidate
                onSubmit={handleSubmit(handleForm)} 
                className="mt-4"
            >
                <ProductFormCreate 
                    register={register}
                    errors={errors}
                />
            </form>
        </>
    )
}
