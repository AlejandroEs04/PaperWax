import { useForm } from "react-hook-form"
import ProcessForm from '../../components/ProcessCrud/ProcessForm'
import { ProcessType } from "../../types"
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom"
import { createProcess, finishProcess } from "../../api/ProcessApi"
import { toast } from "react-toastify"
import { useParams } from 'react-router-dom'
import { getProcessById } from '../../api/ProcessApi'
import ProcessFormEdit from "../../components/ProcessCrud/ProcessFormEdit"
import Loader from "../../components/Loader"
import { useEffect } from "react"

export default function ProcessEdit() {
    const params = useParams()
    const navigate = useNavigate()
    const processId = params.id!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProcess', processId],
        queryFn: () => getProcessById(+processId)
    })

    const { mutate } = useMutation({
        mutationFn: finishProcess, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: data})

    const handleForm = (data : ProcessType) => {
        const formData = {
            data, 
            processId: +processId
        }
        mutate(formData)
    }

    useEffect(() => {
        if(data) {
            reset({...data, end_time: new Date().toISOString()})
        }
    }, [data, reset])

    if(isLoading) return <Loader />

    return (
        <>
            <h1 className='text-3xl font-semibold'>Finalizar Proceso</h1>
            <p className='text-lg text-blue-600'>Registra la información que se solicita para finalizar el proceso</p>
            
            <form
                noValidate
                className="mt-4"
                onSubmit={handleSubmit(handleForm)} 
            >
                <ProcessFormEdit 
                    register={register}
                    errors={errors}
                />
            </form>
        </>
    )
}
