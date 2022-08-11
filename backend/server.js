require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const router = require('./routes');
const cors = require('cors')
const Dbconnect = require('./database')
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const ACTIONS = require('./action');
const { RoomRecordingContext } = require('twilio/lib/rest/video/v1/room/recording');
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
            io.to(clientId).emit(ACTIONS.ADD_PEER,{
                peerId: socket.id,
                createOffer: false,
                user
            })
        })
        socket.emit(ACTIONS.ADD_PEER,{
            peerId: clientId,
            createOffer:true,
            user: socketUserMapping[clientId]
        })
        socket.join(roomId);
        
    })
    //handle relay ice
    socket.on(ACTIONS.RELAY_ICE,({peerId, icecandidate})=>{
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
            peerId: socket.id,
            icecandidate,
        });
    })
    //handle relay sdp(session description )
    socket.on(ACTIONS.RELAY_SDP,({peerId, sessionDescription})=>{
        io.on(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
            peerId: socket.id,
            sessionDescription,
        })
    })
    //leaving the room
    const leaveRoom =({roomId})=>{
        const {rooms} = socket;
        Array.from(rooms).forEach(roomId=>{
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId)|| [])
        });
        clients.forEach(clientId=>{
            io.to(clientId).emit(ACTIONS.REMOVE_PEER,{
                peerId: socket.id,
                userId: socketUserMapping[socket.id].id

            })
            socket.emit(ACTIONS.REMOVE_PEER,{
                peerId:clientId,
                userId: socketMapping[clientId].id
            })
        })
        
    }
    socket.on(ACTIONS.LEAVE,leaveRoom);
}) 
server.listen(PORT,()=>console.log(`Listening on port ${PORT}`));