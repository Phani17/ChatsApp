const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT ||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{  //allows to register event listener ,socket represnts individual socket not all users
  console.log('New user connected');//io.on lets us listen for server-wide events like new socket connections. The callback function we create is where we can setup events for that newly connected socket
  // socket.emit('newEmail',{
  //   from:'phani@ex.com',
  //   text:'Hey. How are u',
  //   createAt:123
  // });
  socket.emit('newMessage',{
    from:'john@ex.com',
    text:'C u den',
    createAt:456
  });
  socket.on('createMessage',function(message){
    console.log('createMessage',message);
  });
  // socket.on('createEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });
  socket.on('disconnect',()=>{
    console.log('User was DisConnected');
  });
});
server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
