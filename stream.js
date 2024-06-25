const {createReadStream} = require('fs')
const stream = createReadStream('./content/subfolder/first.txt',{encoding:'utf8',highWaterMark:9000})

stream.on('data',(result)=>{
console.log(result)
});
//check error 
stream.on('error',(err)=>{
    console.log(err)
    });

//read on open and pipe data in chunk to writablestream
var fs = require('fs');
var http = require('http')
http
.createServer(function (req,res){
const fileStream = fs.createReadStream('./content/subfolder/first.txt','utf8');
fileStream.on('open',()=>{
// fileStream.pipe()//send data on chunks 
//console.log("opend")
fileStream.pipe(res)//pipe data into writable stream on chunks 
//res.write(data)
//res.end()
})
fileStream.on('error',(err)=>{
    console.log("err",err)
    res.end(err)   
    });
}).listen(5000)
