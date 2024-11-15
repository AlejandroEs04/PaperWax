import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { RawMaterialCreate } from "../../types"
import { createMaterial } from "../../api/MaterialApi"
import RawMaterialForm from "../../components/MaterialCrud/RawMaterialForm"

export default function MaterialRegister() {
    const initialValues : RawMaterialCreate = {
        name: '', 
        stock: 0, 
        amount: 0,
        unit: 'KILOGRAMS', 
        type_id: 1
    }

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createMaterial, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (data : RawMaterialCreate) => mutate(data)

    return (
        <>
            <h1 className='text-3xl font-semibold'>Registrar Material</h1>
            <p className='text-lg text-blue-600'>Registra la información de la materia prima</p>
            
            <form
                noValidate
                onSubmit={handleSubmit(handleForm)} 
                className="mt-4"
            >
                <RawMaterialForm 
                    register={register}
                    errors={errors}
                />
            </form>
        </>
    )
}
