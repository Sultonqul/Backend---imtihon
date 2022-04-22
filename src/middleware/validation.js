import { loginSchema, registerSchema, fileSchema} from "../utils/validations.js";
import { ValidationError } from "../utils/errors.js";

export default (req,res,next)=> {
    try {
        if(req.url == '/login'){
            const {error} = loginSchema.validate(req.body)
            if(error) throw error
        }
        if(req.url == '/register'){
            const {error} = registerSchema.validate(req.body)
            if(error) throw error
        }
        if(req.url == '/files'){
            const {error} = fileSchema.validate(req.body)
            if(error) throw error
        }
        return next()
    } catch (error) {
        return next(new ValidationError(400,error.massage))
    }
}