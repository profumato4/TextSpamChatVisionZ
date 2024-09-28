const messageInput = document.querySelector("#messageInput");
const sendButton = document.querySelector("#send");
const messageToSend = "Ciao! Questo è un messaggio automatico."; 

function sendMessage() {
    if (messageInput && sendButton) {
        messageInput.value = messageToSend; 
        sendButton.disabled = false; 
        sendButton.click(); 
    }
}

const chatPanel = document.querySelector(".chat-panel");

const observer = new MutationObserver(() => {
    if (!chatPanel.classList.contains("hide")) {
        sendMessage();
        observer.disconnect(); 
    }
});

observer.observe(chatPanel, { attributes: true });
