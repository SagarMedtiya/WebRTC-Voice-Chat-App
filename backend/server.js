require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const router = require('./routes');
const cors = require('cors')
const Dbconnect = require('./database')
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const ACTIONS = require('./action')
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
const socketUserMapping ={

}

io.on('connection',(socket) =>{
    console.log('new Connection', socket.id);
    
    socket.on(ACTIONS.JOIN,({roomId, user})=>{
        
        socketUserMapping[socket.id] = user;
        //new Map
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.ADD_PEER,{})
        })
        socket.emit(ACTIONS.ADD_PEER,{})
        socket.join(roomId);
        
    })
    //new Map
    
}) 
server.listen(PORT,()=>console.log(`Listening on port ${PORT}`));