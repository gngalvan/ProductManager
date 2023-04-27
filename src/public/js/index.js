const socket = io();

socket.emit('message', 'Mensaje desde frontend');

socket.on('evento_socket_individual', data => {
  console.log(data);
});