import { Router } from "express"
import { ProcessController } from "../controllers/ProcessController"

const router = Router()

router.get('/', ProcessController.getProcess)
router.get('/:id', ProcessController.getProcessById)
router.post('/', ProcessController.createProcess)
router.put('/finish/:id', ProcessController.finishProcess)
router.get('/:type/:date', ProcessController.getPrintProcess)

export default router