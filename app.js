
const express = require('express')
const app = express()
const {router:tasks,router2:tasks2} = require('./rpeople')
const connectdb = require('./db')
const {authuser} = require('./tasks')

////////////////////////security packge 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const notFound =require('./not-found')
const errorHandlerMiddleware = require('./error-handler')
app.set('trust proxy', 1);//TODO agree push app behind proxy server
app.use(express.static('./public'))
app.use(express.json())
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
// app.use(express.urlencoded({extended:false}));

app.use('/api/v1/people',tasks)
app.use('/api/v1/people',authuser,tasks2)

app.use(errorHandlerMiddleware)
app.use(notFound)

// app.use('/api/v1/people/:id',express.static('./public'))
// app.get('/login',login)
const port = process.env.PORT || 3000 


const start = async() =>{
    try {       
      // await connectdb(process.env.db_uri_mongo)

   await connectdb(process.env.db_uri)
    app.listen(port,console.log("listeneing on port ",port))

    } catch (error) {
        console.log(error)
    }

}
start()