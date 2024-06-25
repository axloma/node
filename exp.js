//const app = require('express')();
//create express app 
const { log } = require('console');
const express = require('express');
const data = require('./data')
//create instance 
const app = express()
const peoplex = require('./rpeople')
app.use('/api/peoplex',peoplex)
////method 
//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen

//use get
const path = require('path');
app.use(express.static('./public'))

app.get('/prod',(req,res)=>{
res.json({name:"YASSER",id:1});

//res.status(200).send("WHAT TO SEND ");//
// res.sendFile(path.resolve(__dirname,'./index.html'));
});
//use rote pramater "placehoder"
const products = [{name:"A",id:1},{name:"B",id:2},{name:"c",id:3}]
app.get('/prodn/:name',(req,res)=>{
const pname = req.params.name
console.log(req.params)
console.log(pname,"NAME")


const s = products.find((single)=>single.name == "B")
res.json(s)
});
//TODO get the query "after ?"
app.get('/prod/search',(req,res)=>{
    const q = req.query;
    console.log(q);
    //distructure req.query 
   const {name,id} = req.query;
    console.log(name,id)
    res.json(q)
    });



//create middleware function 
const mdw = (req,res,next) =>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time)
    next()//TODO go to next 
    }
    //use middleware function in rute 
    app.get('/md',mdw,(req,res)=>{
    res.send("MIDLE WARE")
    })
    app.use(express.urlencoded({extended:false}));
    app.use(express.json())//TODO handle incoming json data 
app.post('/login',(req,res)=>{
const fbody = req.body

res.json(fbody)
})
app.get('/api/people',(req,res)=>{
    
    res.json(data)
    })
    app.post('/api/people',(req,res)=>{
        const {name} = req.body
        console.log(req.body)
        console.log(name)
        res.status(201).json({name})
        //res.status(201).json(data)
        })
    

//use all handle all get post etc request
app.all('*',(req,res)=>{
res.status(404).send("PAGE NOT F ");
});



//listen to port 
app.listen(5000,()=>{
console.log('listenening');
})