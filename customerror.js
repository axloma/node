////////////create custome api error and extend java error 
class CustomApiError extends Error{
    constructor(msg,statuscode){
    this.statusCode = statuscode
    super(msg)
    }
    
    }
const createcustomerror = (msg,statuscode)=>{

    return new CustomApiError(msg,statuscode)
}

module.exports = {CustomApiError,createcustomerror}
