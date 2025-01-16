const form = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const newMessage = document.createElement('li');
    newMessage.textContent = messageInput.value;
    messageList.appendChild(newMessage);
    messageInput.value = ''; // 清空输入框
});
