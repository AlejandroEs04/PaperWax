import { Link } from "react-router-dom"

export default function SalesIndex() {
    return (
        <>
            <div className='flex justify-between items-end mt-4'>
                <div>
                    <h1 className='text-3xl font-semibold'>Ventas</h1>
                    <p className='text-lg text-blue-600'>Administra las ventas del sistema</p>
                </div>

                <Link to={'register'} className='text-blue-600'>+ Agregar Venta</Link>
            </div>
            <hr />


        </>
    )
}
