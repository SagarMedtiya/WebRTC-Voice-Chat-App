require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const router = require('./routes');
const cors = require('cors')
const Dbconnect = require('./database')
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})
app.use(cookieParser());
Dbconnect();
const corsOption ={
    origin : ['http://localhost:3000'],
    credentials:true,
}
//log requests
app.use(morgan('tiny'));
app.use(cors(corsOption));
app.use('/storage',express.static('storage'))
app.use(express.json({limit: '8mb'}));
app.use(router);
app.get('/',(req,res)=>{
    res.send('hello from express');
})
//socket
io.on('Connection',(socket) =>{
    console.log('new Connection', socket.id);
}) 
server.listen(PORT,()=>console.log(`Listening on port ${PORT}`));