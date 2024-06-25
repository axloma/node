
const x = require('./log.js')
//x.fname("HELLOW MAN I'M GOOD ")
x("HIMAN")
const path = require('path');
var p = path.parse(__filename)
console.log(p.base,p.name,p.ext,p.root,p.dir) //TODO show the path obj and its method 
 
//use os module 
const os = require('os')
var tm = os.totalmem();//TODO get total memory
var fm = os.freemem();//TODO get free memory 
var cp = os.cpus();
//console.log("total",tm,"fm",fm,"CPU",cp)

//const info = require('./info.js')
//console.log(info())
const fs = require('fs');
//return an arry of file as syncronice 
const files = fs.readdirSync('./');
//console.log(files)

//return an array string of files as asyncronice withcallback
fs.readdir('./',function(err,string){
if (err) console.log("E",err);
else console.log("RES",files);
});




//create class of event emitter 
const EventEmitter = require('events');
//create an object of emiiter class 
const emitter = new EventEmitter();
//register a listener with argument
emitter.on('messageLogged',function(arg){
console.log('Listener called ',arg);
});
//raise event with arg 
emitter.emit('messageLogged',{id:1,url:"THIS IS THE NEW "});


//load http module
const http = require('http');
//create server and listen to request 
const server = http.createServer((req,res) => {
if (req.url === '/'){
res.write('hello world ');
res.end();//TODO end response
}
if (req.url === '/home'){
res.end("THIS IS HOME PAGE");//TODO end response and write 
}
});
server.listen(3000);



//use readFileSync writeFileSync "as distructure "
const {readFileSync,writeFileSync} = require('fs');
//read data from file using sync
const first = readFileSync('./content/subfolder/first.txt','utf8')

console.log(first,"FFILE");
writeFileSync('newfile.txt',`this is writen by fssync ${first}`);

//append data to exist file using flag 
const second = readFileSync('./content/subfolder/second.txt','utf8')
writeFileSync('newfile.txt',`this is writen ${second}`,{flag:'a'});

const {readFile,writeFile} = require('fs')
readFile('./content/subfolder/first.txt','utf8',(err,result)=>{
if (err) {console.log(err)
return
}
console.log(result)
});

writeFile('./writasync.txt',"THIS IS WRITEN BUY ASYNC",(err,result)=>{
if (err) {
console.log(err);
return ;
}
console.log(result,"WRITEN FILE")
});


const _ = require('lodash')
const items = [1,2,[3,4],[5]]
const flatdeep = _.flattenDeep(items)
console.log(flatdeep)


const getText = (path) =>{
return new Promise((resolve,reject)=>{
readFile(path,'utf8',(err,data) => {
if (err) {
reject(err)
return
}else{
resolve(data)
console.log(data,"PROMISE")
}

})
})
}
//getText('./content/subfolder/first.txt')
//.then((result) => console.log(result))
//.catch((err) => console.log(err))


const start = async () => {
try {
const first = await getText('./content/subfolder/first.txt')
console.log (first)
}catch (error) {
console.log(error)
}
}
//envoke the function 
start()


