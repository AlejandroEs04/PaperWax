import { Outlet, Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AppLayout() {
    return (
        <>
            <header className="bg-white shadow py-3">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-center gap-10 items-center">
                    <Link to={'/'} className="text-xl font-semibold text-blue-600">PaperWax Web</Link>
                    <nav className="flex gap-4">
                        <Link to={'/'} className="font-semibold hover:text-blue-600 transition-colors">Dashboard</Link>
                        <Link to={'/materials'} className="font-semibold hover:text-blue-600 transition-colors">Materiales</Link>
                        <Link to={'/products'} className="font-semibold hover:text-blue-600 transition-colors">Productos</Link>
                        <Link to={'/'} className="font-semibold hover:text-blue-600 transition-colors">Procesos</Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-5">
                <Outlet />
            </main>

            <footer>

            </footer>

            <ToastContainer />
        </>
    )
}
