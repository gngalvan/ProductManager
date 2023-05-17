const socket = io();

const messageTemplate = Handlebars.compile(document.getElementById("messageTemplate").innerHTML);

function generateNewMessage(message) {
  return messageTemplate({ messages: [message] });
}

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatContainer = document.getElementById("chatContainer");

newmessage.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const message = messageInput.value;

  const newmsg = {
    email,
    message,
  };

  socket.emit("messageAdded", newmsg);

  messageInput.value = "";
});

socket.on("addMessage", (message) => {
  message.timestamp = new Date();
  const msg = generateNewMessage(message);
  chatContainer.innerHTML += msg;
  chatContainer.scrollTop = chatContainer.scrollHeight;
});
