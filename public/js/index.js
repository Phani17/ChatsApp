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
  var li=jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from:'Frank',
//   text:'Hi'
// },function(data){
//   console.log('Got it ',data);
// });

socket.on('newLocationMessage',function(message){
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">My Current Location</a>');

  li.text(`${message.from} : `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  });
});

var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by ur browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location');
  });
});
