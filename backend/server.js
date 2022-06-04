require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const router = require('./routes');
const cors = require('cors')
const Dbconnect = require('./database')

Dbconnect();
const corsOption ={
    origin : ['http://localhost:3000'],
    credentials:true,
}
app.use(cors(corsOption))
app.use(express.json());
app.use(router);
app.get('/',(req,res)=>{
    res.send('hello from express');
})

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));