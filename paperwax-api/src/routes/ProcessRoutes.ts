import { Router } from "express"
import { ProcessController } from "../controllers/ProcessController"

const router = Router()

router.get('/', ProcessController.getProcess)
router.get('/:id', ProcessController.getProcessById)
router.post('/', ProcessController.createProcess)
router.put('/finish/:id', ProcessController.finishProcess)

export default router