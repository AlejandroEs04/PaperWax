import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Index from './views/Index'
import MaterialInventory from './views/managment/MaterialInventory'
import MaterialRegister from './views/managment/MaterialRegister'
import ProductDashboard from './views/managment/ProductDashboard'
import ProductRegister from './views/managment/ProductRegister'
import ProcessRegister from './views/production/ProcessRegister'
import ProcessEdit from './views/production/ProcessEdit'
import SalesIndex from './views/managment/SalesIndex'
import PurchasesIndex from './views/managment/PurchasesIndex'
import SaleCreate from './views/managment/SaleCreate'
import SaleEdit from './views/managment/SaleEdit'

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
                    <Route path='/sales' element={<SalesIndex />}/>
                    <Route path='/sales/register' element={<SaleCreate />}/>
                    <Route path='/sales/edit' element={<SaleEdit />}/>
                    <Route path='/purchases' element={<PurchasesIndex />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
