import { Router } from "express"
import { ProcessController } from "../controllers/ProcessController"

const router = Router()

router.get('/', ProcessController.getProcess)

export default router