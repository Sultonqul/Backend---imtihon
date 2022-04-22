import { Router } from "express";
import controller  from '../controllers/file.js'
import validation from "../middleware/validation.js";
const router = Router()

router.post('/files',validation,controller.POST)
router.put('/files',controller.PUT)
router.delete('/files',controller.DELETE)
router.get('/files',controller.GET)
router.get('/download/:fileName',controller.DOWNLOAD)

export default router