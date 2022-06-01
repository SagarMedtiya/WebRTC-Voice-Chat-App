require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const router = require('./routes');
const Dbconnect = require('./database')

Dbconnect();
app.use(express.json());
app.use(router);
app.get('/',(req,res)=>{
    res.send('hello from express');
})

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));