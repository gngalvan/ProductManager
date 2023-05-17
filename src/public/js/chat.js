const socket = io();

let user;
const chatBox = document.getElementById('chatBox');

Swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresa tu email',
  inputValidator: (value) => {
    return !value && 'Necesitas ingresar un mail para poder chatear'
  },
  allowOutsideClick: false,
  allowEscapeKey: false
}).then(result => {
  user = result.value;
});

chatBox.addEventListener('keyup', evt => {
  if(evt.key === 'Enter') {
    if(chatBox.value.trim().lenght > 0) {
      socket.emit('message', { user, message: chatBox.value});
    };
  };
});

socket.on('addMessage', data => {
  let log = document.getElementById('messageLogs');
  let messages = [];
  data.forEach(message => {
    messages += `${message.user} say: ${message.message}<br/>`
  });
  log.innerHTML = messages;
})