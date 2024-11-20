import { Router } from "express"
import { SaleController } from "../controllers/SaleController"

const router = Router()

router.get('/', SaleController.getSales)
router.post('/', SaleController.createSale)
router.get('/products/all', SaleController.getSaleProducts)

export default router