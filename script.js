const form = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');

// 获取所有留言并显示
async function fetchMessages() {
    const response = await fetch('http://127.0.0.1:5000/messages'); // 向后端获取数据
    const messages = await response.json();
    messageList.innerHTML = ''; // 清空列表
    messages.forEach(msg => {
        const newMessage = document.createElement('li');
        newMessage.textContent = msg;
        messageList.appendChild(newMessage);
    });
}

// 提交新留言到后端
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput.value })
    });
    messageInput.value = ''; // 清空输入框
    fetchMessages(); // 刷新留言列表
});

// 页面加载时获取留言
fetchMessages();
