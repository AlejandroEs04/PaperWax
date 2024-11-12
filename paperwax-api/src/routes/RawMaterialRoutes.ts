import { Router } from "express"
import { RawMaterialController } from "../controllers/RawMaterialController"

const router = Router()

router.get('/', RawMaterialController.getAllRawMaterial)
router.post('/', RawMaterialController.createRawMaterial)
router.get('/types', RawMaterialController.getAllRawMaterialType)

export default router