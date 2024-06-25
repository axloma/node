const path = require('path')
const data = require('./data')
//in app file 
const {Task,User,Course} = require('./mongotask')
const jwt = require('jsonwebtoken')

const authuser = async (req,res,next)=>{
    console.log(req,"REQ")
    const user = req.headers.authorization
    console.log(user,"USER")
    const checktoken = user.split(' ')[1]
    console.log(user,"USER")
    //decoded user data and send it 
    const decoded = jwt.verify(checktoken,process.env.secertkey)
    req.user = {name:decoded.name,id:decoded.uid}
    next()

}
const createcourse = async(req,res)=>{
    console.log(req.body)
    console.log(req.headers.authorization,"AUTH")

    req.body.ownerid = req.user.id
    const course = await Course.create({...req.body})
    // const user = await User.create(req.body)
    // const user = await User.create({name:"yasser4",password:"yaso136",id:4})
    res.status(201).json({course})
}
const getallcourse = async(req,res)=>{

    const course = await Course.find({ownerid:req.user.id})
    // const course = await Course.create({...req.body})
    // const user = await User.create(req.body)
    // const user = await User.create({name:"yasser4",password:"yaso136",id:4})
    res.status(201).json({course})
}
const getcourse = async(req,res)=>{
    console.log(req.params.id,"IDIS")
    const course = await Course.find({_id:req.params.id})
    
    // const course = await Course.create({...req.body})
    // const user = await User.create(req.body)
    // const user = await User.create({name:"yasser4",password:"yaso136",id:4})
    res.status(201).json({course})
}
const dcourse = async(req,res)=>{
    console.log(req.params.id,"IDIS")
    const course = await Course.findByIdAndDelete({_id:req.params.id})
    
    // const course = await Course.create({...req.body})
    // const user = await User.create(req.body)
    // const user = await User.create({name:"yasser4",password:"yaso136",id:4})
    res.status(201).json({course})
}


//create new user
const createuser = async(req,res)=>{
    console.log(req.body)
    const user = await User.create({...req.body})
    const token = user.ctoken()
    console.log(token,"TOKEN",user,"USER")
    // const user = await User.create(req.body)
    // const user = await User.create({name:"yasser4",password:"yaso136",id:4})
    res.status(201).json({user,token})
}


const getuser = async(req,res)=>{
    const {name,password} = req.body
    console.log(req.body)
const user = await User.findOne({name})

if(!user){
    return res.status(400).json({msg:"UNAUTHENTICATED"})
}
console.log("USER EXIST ",user)
const checkpass = await user.checkpass(password)
if(!checkpass){
   return res.status(400).json({msg:"UNAUTHENTICATED"})
}
console.log(checkpass,"CHECKED")
const token = user.ctoken()
return res.status(200).json({user,token})

}
//create new task 
// Task.create({name:"YASSER",id:"1",completed:false})
const {createcustomerror} = require('./customerror')
const { decode } = require('punycode')

const getalltask =  async (req,res)=>{
    // res.send("ALL TASK ")
    // req.body.name = "IRWM"
    try {       
        const tasks = await Task.find({})//TODO get all obj in db
        console.log(tasks)
        // res.json({tasks})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    // res.json(data)
    // console.log(req.body)
}
const createtask = async (req,res)=>{
    // res.send("create TASK ")
    const task = await Task.create({name:req.body.name,id:3,completed:true})
    res.status(201).json({task})
    console.log(task)
}
const gettask =async (req,res,next)=>{
    try {
        const stask =  await Task.findOne({_id:req.params.id});
        // res.sendFile(path.resolve(__dirname,'./public/edite.html'),{stask:stask});
        // res.send("get TASK ")
        if (!stask){
            
            return next(createcustomerror("NOT FOUND ",404))
        }
       return res.status(200).json({stask});
    } catch (error) {
        console.log(error)
        res.status(404).send("FAILED")
    }
}

const updatetask = async (req,res)=>{
    try {
        const stask =  await Task.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,runValidators:true,
        });
        res.status(200).json({stask});
        // res.sendFile(path.resolve(__dirname,'./public/edite.html'),{stask:stask});
        // res.send("get TASK ")
        
        
    } catch (error) {
        console.log(error)
        res.status(404).send("FAILED")
    }


    // res.send("patch TASK ")
}

const deletetask = async (req,res)=>{
    // res.send("remove TASK ")
    try {
        const task =  await Task.findOneAndDelete({_id:req.params.id});
        res.status(200).json({task});
        // res.sendFile(path.resolve(__dirname,'./public/edite.html'),{stask:stask});
        // res.send("get TASK ")
        
    } catch (error) {
        console.log(error)
        res.status(404).send("FAILED")
    }

}
const deleteall = async (req,res)=>{
    // res.send("remove TASK ")
    try {
        const task =  await Task.deleteMany();
        res.status(200).json({task});     
    } catch (error) {
        console.log(error)
        res.status(404).send("FAILED")
    }

}
const search =  async(req,res)=>{
    // res.send("remove TASK ")
    try {
        //,{search: search}
        // let task =  await  Task.find({name:{$regex:req.params.search,$options:"i"},}).sort('name');
        let itemid = await Task.find({id:{$gt:2,$lt:5}})
        let tasks = Task.find({name:{$regex:req.params.search,$options:"i"},}).sort('name');
        // const task =  await Task.find({name:"yasser"});
        const tr = req.params.search
        // const item = await task.select('name')
        // const item =  Task.find({}).select('name _id');
        let item =  tasks.select('name _id');
        // const item2 = await Task.find({},'name _id'); // <--- Just multiple fields name space separated);
        console.log(item)
        // console.log(item2,"ITEM2")
        console.log(req.params)
        console.log(tr)
        console.log(req.query)
               
        // res.status(200).json({task});   
        
        /////////pagegnition using skip and limit
        const page = Number(req.query.page) || 1
        const limit =  Number(req.query.limit) || 3
        const skip =  (page - 1) * limit 
        item = item.skip(skip).limit(limit)
        let task =  await item
 
        res.status(200).json({task,itemid}) 

    } catch (error) {
        console.log(error)
        res.status(404).send("FAILED to get search")
    }
    
}
const loginuser =  async(req,res) =>{
    try {
        
        // const tasks = await Task.find({})//TODO get all obj in db
        // console.log(tasks)
        const token = await jwt.sign({name:"yasser"},"yaso136",{expiresIn:'3d'})
        // res.json({tasks})
        res.status(200).json({token})
        // const data = jwt.verify(token,'yaso136')

    } catch (error) {
        console.log(error)

    }
}
const gettoken =  async(req,res) =>{
    try {

        const token = req.headers.authorization 
        console.log("TOKEN",token)
        const checktoken = token.split(' ')[1]
        const decoded = await jwt.verify(checktoken,'yaso136')
        console.log(decoded)
        const user = req.user
        res.status(200).json({decoded,user})

    } catch (error) { 

        console.log(error)

    }

}
module.exports = {
    getalltask,
    createtask,
    gettask,
    updatetask,
    deletetask,
    deleteall,
    search,
    loginuser,
    gettoken,
    createuser,
    getuser,
    authuser,
    createcourse,
    getallcourse,
    getcourse,
    dcourse,

}











