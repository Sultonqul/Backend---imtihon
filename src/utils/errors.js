export class ForbiddenError extends Error{
    constructor(status,massage){
        super()
        this.name = 'ForbiddenError'
        this.massage = massage 
        this.status = status
    }
}
export class ValidationError extends Error{
    constructor(status,massage){
        super()
        this.name = 'ValidationError'
        this.massage = massage 
        this.status = status
    }
}
export class InternalServerError extends Error{
    constructor(status,massage){
        super()
        this.name = 'InternalServerError'
        this.massage = massage 
        this.status = status
    }
}
export class AuthorizationError extends Error{
    constructor(status,massage){
        super()
        this.name = 'AuthorizationError'
        this.massage = massage 
        this.status = status
    }
}