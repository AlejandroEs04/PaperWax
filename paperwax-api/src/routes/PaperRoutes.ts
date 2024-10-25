import { Router } from "express"
import { PaperController } from "../controllers/PaperController"

const router = Router()

router.post('/', PaperController.createPaper)
router.get('/', PaperController.getAllPapers)

export default router