import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Index from './views/Index'
import MaterialInventory from './views/managment/MaterialInventory'
import MaterialRegister from './views/managment/MaterialRegister'
import ProductDashboard from './views/managment/ProductDashboard'
import ProductRegister from './views/managment/ProductRegister'
import ProcessRegister from './views/production/ProcessRegister'
import ProcessEdit from './views/production/ProcessEdit'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Index />}/>
                    <Route path='/products' element={<ProductDashboard />}/>
                    <Route path='/products/register' element={<ProductRegister />}/>
                    <Route path='/materials' element={<MaterialInventory />}/>
                    <Route path='/materials/register' element={<MaterialRegister />}/>
                    <Route path='/processes/register' element={<ProcessRegister />}/>
                    <Route path='/processes/edit/:id' element={<ProcessEdit />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
