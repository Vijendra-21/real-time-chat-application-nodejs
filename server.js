const express = require("express");
const path = require('path');
const app = express();
const http = require('http').createServer(app); 
const PORT = process.env.PORT || 5000;

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
    socket.on('send',(msg)=>{
        socket.broadcast.emit('recieve',{message:msg , name:users[socket.id]})
    })
    socket.on('new-user-joined',(name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    })
    socket.on('disconnect',(msg)=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

