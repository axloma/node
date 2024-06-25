
const mongoose = require('mongoose')
require('dotenv').config()
// const connection = "mongodb+srv://yasseremad556:yasseremad136@node.qyfwage.mongodb.net/dbname?retryWrites=true&w=majority&appName=NODE"
const connection = "mongodb+srv://yasseremad556:yasseremad136@node.qyfwage.mongodb.net/dbname?retryWrites=true&w=majority&appName=NODE"



//connect to atlas db "IT return promise"
// mongoose.connect(connection)
// .then(()=>{console.log("connected sucessfully...")})
// .catch((err)=>{console.log(err)})

//create function to connect and export it 
const connectdb = (url)=>{
return mongoose.connect(url)
.then(()=>{console.log("connected sucessfully...")})
.catch((err)=>{console.log(err)})

}
module.exports = connectdb