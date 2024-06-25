const express = require('express');
const router = express.Router()
const router2 = express.Router()

const {getalltask,createtask,gettask,updatetask,deletetask,deleteall,search,
    loginuser,gettoken,createuser,getuser,
    authuser,createcourse,getallcourse,getcourse,dcourse} = require('./tasks')
// router.get('/',(req,res)=>{

// res.send("wels")

// })

// router.route('/').get((req,res)=>{

//     res.send("wels")
    
//     })
router.route('/').get(getalltask).post(createtask).delete(deleteall)
router.route('/:id').get(gettask).patch(updatetask).delete(deletetask)

router.route('/search/item').get(search)
router.route('/search/item/:search').get(search)
router.route('/login/loginuser').get(loginuser)
router.route('/login/loginuser').post(getuser)
router.route('/login/signuser').post(createuser)
router2.route('/login/gettoken').get(gettoken)

router2.route('/login/course').post(createcourse).get(getallcourse)
router2.route('/login/course/:id').get(getcourse).delete(dcourse)


module.exports = {router,router2} 


