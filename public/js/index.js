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
// socket.on('newEmail',function (email) { 
//   console.log('New Email',email);
// });
socket.on('newMessage',function (message) {
  console.log('New Message',message);
});
