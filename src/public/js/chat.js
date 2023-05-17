const socket = io();


function generateNewMessage(message) {
  return `<div class="message">
  <p class="title">${message.email}</p>
  <p class="description">${message.message}</p>
  <p class="time">${message.timestamp}</p>
  </div>`;
};
const newmessage = document.querySelector('#newmessage');

newmessage.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const newmsg = {
    email,
    message,  

  }
  socket.emit("message", newmsg)
  document.getElementById("message").value = ""
});

socket.on("addMessage", async (message) => {
  message.timestamp = new Date()
  const msg = generateNewMessage(message);
  document.querySelector("#chat").innerHTML += msg;
  let chatBox = document.getElementById("chatGeneral"); chatBox.scrollTop = chatBox.scrollHeight;
})