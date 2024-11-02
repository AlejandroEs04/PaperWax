import { Router } from "express"
import { AuthController } from "../controllers/AuthController"

const router = Router()

router.post('/', AuthController.createAccount)
router.post('/login', AuthController.login)

export default router