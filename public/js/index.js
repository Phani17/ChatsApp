var socket=io();//initiaing request from client to server
socket.on('connect',function(){
  console.log('Connected to server');
  // socket.emit('createEmail',{
  //   to:'mahi@ex.com',
  //   text:'U r gr8'
  // });

});
socket.on('disconnect',function(){
  console.log('Disconnected from server');
});
// socket.on('newEmail',function (email) { //socket.on lets us setup event handlers for the individual socket. This could be a custom event like "newMessage" or a built-in one like "disconnect"
//   console.log('New Email',email);
// });
socket.on('newMessage',function (message) { //socket.on lets us setup event handlers for the individual socket. This could be a custom event like "newMessage" or a built-in one like "disconnect"
  console.log('New Message',message);
});
