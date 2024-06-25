const http = require('http')
const {readFileSync} = require('fs')
const home = readFileSync('./index.html')
const server = http.createServer((req,res)=>{
    console.log(req.method) //get the request method 
    if (req.url == "/"){
    res.writeHead(200,{'content-type':'text/html'})
    //res.write('<h1>hi yasser</h1>');
    res.write(home)

    res.end()
    }
    else{
        res.writeHead(404,{'content-type':'text/html'})
        res.write('<h1>not found yasser</h1>')
        res.end()
    }
})
server.listen(5000)