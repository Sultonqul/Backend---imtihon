import { InternalServerError, ForbiddenError} from "../utils/errors.js"
import JWT from 'jsonwebtoken'
import path from 'path'
process.API = 'https://super-imtihon.herokuapp.com/'
let API = process.API
const POST =(req,res,next) => {
    try {
        const { videoInput,time,userId,token} = req.body
        const { file } = req.files
        let verify = JWT.verify(token,"12345")

        let files = req.readFile('files')
        let users = req.readFile('users')
        let very = users.find(el => el.userId == verify.userId)
        if(!very){
            return next(new ForbiddenError(403,'You are not allowed!'))
        }

    const viewFile = Date.now() + file.name.replace(/\s/g,"")
    const newDate = new Date()
    let newFile = {
        fileId: files.length ? files.at(-1).fileId + 1 : 1,
        userId: userId,
        videoInput,
        viewFile:API + viewFile,
        time,
        data:newDate.toLocaleDateString(),
        downloadLink: viewFile,
        size: Math.floor(+file.size / 1000000)
    }
    files.push(newFile)
    req.writeFile('files',files)
    file.mv(path.join(process.cwd(),'src','uploads',viewFile))

    return res.status(200).json({
        status:200,
        massage:"The files successfully!",
        data:newFile
    })
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
const GET = (req,res,next)=>{
    try {
        let files = req.readFile('files')
        let users = req.readFile('users')
        let file = files.map(file => {
            file.user = users.find(user => user.userId == +file.userId)
            file.viewLinkFile = file.viewFile
            file.downloadLink = API + 'download/' + file.downloadLink
            delete file.userId
            delete file.user.password
            return file
        })
        return res.status(200).json(file)
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
const DOWNLOAD = (req,res,next) => {
    try {
        res.download(path.join(process.cwd(),'src','uploads',req.params.fileName))
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
const PUT = (req,res,next) => {
    try {
        const {value,userId,val} = req.body 
        let files = req.readFile('files')
        let file = files.find(el => +el.userId == userId && el.videoInput == val)
        if(value) file.videoInput = value
        req.writeFile('files',files)
        return res.send("ok")
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
const DELETE = (req,res,next) =>{
    try {
        const { fileId } = req.body 
        let files = req.readFile('files')
        let file = files.filter(el => el.fileId != fileId)
        req.writeFile('files',file)
        return res.send("ok")
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
export default {
    POST,
    GET,
    DOWNLOAD,
    PUT,
    DELETE
}