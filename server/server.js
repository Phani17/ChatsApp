const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT ||3000;
const {isRealString}=require('./utils/validation');
var app=express();
const {Users} =require('./utils/users');
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();
const {generateMessage,generateLocationMessage}=require('./utils/message');
app.use(express.static(publicPath));

io.on('connection',(socket)=>{  //allows to register event listener ,socket represnts individual socket not all users
  console.log('New user connected');
  // socket.emit('newEmail',{
  //   from:'phani@ex.com',
  //   text:'Hey. How are u',
  //   createAt:123
  // });

//socket.on lets us setup event handlers for the individual socket. This could be a custom event like "newMessage" or a built-in one like "disconnect"
//io.on lets us listen for server-wide events like new socket connections. The callback function we create is where we can setup events for that newly connected socket
//IO.emit() ---emits and event to evry single connection
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room name required');
    }
    socket.join(params.room);
    console.log(socket.id);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    //socket.leave('The office fans');
    //io.emit--emits to evry single connected users
    //socket.broadcast.emit--sends msg to evry1 conected to socket server except for own
    //socket.emit--emits specifically to one user
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();
  });
  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
      // socket.broadcast.emit('newMessage',{
      //   from:message.from,
      //   text:message.text,
      //   createdAt:new Date().getTime()
      // });
    });
//  });
  // socket.on('createEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });
  socket.on('disconnect',()=>{
    var user=users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });
});
server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
