document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const homeButton = document.getElementById('homeButton');
    const settingsButton = document.getElementById('settingsButton');
    const helpButton = document.getElementById('helpButton');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const helpOverlay = document.getElementById('helpOverlay');
    const closeSettingsButton = document.getElementById('closeSettingsButton');
    const closeHelpButton = document.getElementById('closeHelpButton');
    const toggleThemeButton = document.getElementById('toggleThemeButton');

    let messages = [{ text: 'Hello, I am an AI assistant.', isUser: false }];
    let isLightTheme = false; // за замовчуванням темна тема

    function renderMessages() {
        messagesContainer.innerHTML = '';
        messages.forEach((message) => {
            const messageLine = document.createElement('div');
            messageLine.classList.add('message-line');
            if (message.isUser) {
                messageLine.classList.add('user');
            } else {
                messageLine.classList.add('ai');
            }

            const bubble = document.createElement('div');
            bubble.classList.add('message-bubble');
            bubble.textContent = message.text;

            messageLine.appendChild(bubble);
            messagesContainer.appendChild(messageLine);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function sendMessage() {
        const inputValue = messageInput.value.trim();
        if (inputValue !== '') {
            messages.push({ text: inputValue, isUser: true });
            renderMessages();
            messageInput.value = '';
            setTimeout(() => {
                messages.push({ text: 'AI response: ' + inputValue, isUser: false });
                renderMessages();
            }, 1000);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    homeButton.addEventListener('click', function () {
        messages = [];
        renderMessages();
    });

    settingsButton.addEventListener('click', function () {
        settingsOverlay.style.display = 'flex';
    });

    helpButton.addEventListener('click', function () {
        helpOverlay.style.display = 'flex';
    });

    closeSettingsButton.addEventListener('click', function () {
        settingsOverlay.style.display = 'none';
    });

    closeHelpButton.addEventListener('click', function () {
        helpOverlay.style.display = 'none';
    });

    toggleThemeButton.addEventListener('click', function () {
        isLightTheme = !isLightTheme;
        if (isLightTheme) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    });

    // Ініціалізуємо відображення з існуючим повідомленням
    renderMessages();
});
