import { useForm } from "react-hook-form"
import ProcessForm from '../../components/ProcessCrud/ProcessForm'
import { ProcessCreate } from "../../types"
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"
import { createProcess } from "../../api/ProcessApi"
import { toast } from "react-toastify"

export default function ProcessRegister() {
    const initialValues : ProcessCreate = {
        type: 'PRINTING',
        initial_weight: 0, 
        product_id: 0, 
        roll_material_id: 0
    }

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: createProcess, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleForm = (data : ProcessCreate) => mutate(data)

    return (
        <>
            <h1 className='text-3xl font-semibold'>Registrar Material</h1>
            <p className='text-lg text-blue-600'>Registra la información de la materia prima</p>
            
            <form
                noValidate
                className="mt-4"
                onSubmit={handleSubmit(handleForm)} 
            >
                <ProcessForm 
                    register={register}
                    errors={errors}
                />
            </form>
        </>
    )
}
