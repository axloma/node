
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const schemaname = new mongoose.Schema({
//     name:String,id:String,completed:Boolean,
//     })

//create schema and spacifie the type "with validation "
const courseSchema = new mongoose.Schema({
  name:{type:String,required:[true,"custom msg"],trim:true,maxlength:[20,'custome msg'],
  },completed:{type:Boolean,default:false},
  ownerid:{type:mongoose.Types.ObjectId,
    ref:'User',
    required:true 
  },


  },{timestamps:true},)
const schemaname = new mongoose.Schema({
    name:{type:String,required:[true,"custom msg"],trim:true,maxlength:[20,'custome msg'],
    },completed:{type:Boolean,default:false},id:String,
    })
  
    const usershcema = new mongoose.Schema({
        name:{type:String,required:[true,"custom msg"],trim:true,maxlength:[20,'custome msg'],unique:true,
        },password:{type:String},
        id:String,
        })

        usershcema.pre('save', async function(next) {
            // hash the password before save it          
            //create the salt 
            const salt =  await bcrypt.genSalt(10)
            //hash the password
            this.password = await bcrypt.hash(this.password,salt)
            next();//go to next middleweare
          });
          usershcema.methods.ctoken = function(){

            return  jwt.sign({name:this.name,uid:this._id},"yaso136",{expiresIn:'3d'})
            }
        usershcema.methods.checkpass  =async function(pass){
           const  ismatch =  await bcrypt.compare(pass,this.password)
          return ismatch;

           
        }

      var Task =   mongoose.model('Task',schemaname)
      var User =   mongoose.model('User',usershcema)
      var Course =   mongoose.model('Course',courseSchema)

// module.exports = mongoose.model('Task',schemaname)
module.exports = {Task, User,Course}