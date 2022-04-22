import { Router } from "express";
import controller  from '../controllers/user.js'
import validation from "../middleware/validation.js";
const router = Router()

router.post('/register',validation,controller.REGISTER)
router.post('/login',validation,controller.LOGIN)
router.get('/users',controller.GET)

export default router