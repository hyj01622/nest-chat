const socket = io('/chattings');

const get = (id) => document.getElementById(id) || null;

const helloStrangerElement = get('hello_stranger');
const chattingBoxElement = get('chatting_box');
const formElement = get('chat_form');

socket.on('user_connected', (username) => {
  drawChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawChat(`${username}: ${chat}`);
});
socket.on('disconnect_user', (username) => {
  drawChat(`${username} has been left`);
});

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const value = e.target.elements[0].value;
//   if (value !== '') {
//     socket.emit('submit_chat', value);
//     drawChat(`me: ${value}`);
//     e.target.elements[0].value = '';
//   }
// };
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에다가 그리기
    drawChat(`me : ${inputValue}`, true);
    event.target.elements[0].value = '';
  }
};

const drawUser = (data) => {
  helloStrangerElement.innerText = `${data} Stranger :)`;
};

const drawChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
    <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  else
    chatBox = `
    <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

const helloUser = () => {
  const username = prompt('what is your name?');
  socket.emit('new_user', username, (data) => drawUser(data));
};

const init = () => {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
};

init();
