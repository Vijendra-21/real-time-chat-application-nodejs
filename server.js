const express = require("express");
const path = require('path');
const app = express();
const http = require('http').createServer(app); 
const PORT = 5000;

const staticPath = path.join(__dirname,'/public')
app.use(express.static(staticPath));

app.get('/',(req,res)=>{
    res.send('index.html')
})

http.listen(PORT,()=>{
   console.log(`server is running at ${PORT}`)
});

const  io = require("socket.io")(http);

const users = {};

io.on('connection',(socket)=>{
    console.log(`conected>>>> socket`);
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
    socket.on('new-user-joined',(name)=>{
        // console.log(`new user = ${name}`);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    })
})

