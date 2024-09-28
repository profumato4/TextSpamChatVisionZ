// Funzione per inviare un messaggio
function sendMessage() {
    const messageBox = document.querySelector('textarea'); // Trova il box per inserire il messaggio
    const sendButton = document.querySelector('button.send-button'); // Trova il bottone di invio (modifica il selettore se necessario)

    if (messageBox && sendButton) {
        messageBox.value = "Ciao, piacere di conoscerti!"; // Inserisci il messaggio
        sendButton.click(); // Clicca il pulsante di invio
    }
}

// Osserva il DOM per rilevare quando inizia una nuova conversazione
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            const newConversationElement = document.querySelector('.chat-status'); // Modifica il selettore con quello corretto
            if (newConversationElement && newConversationElement.textContent.includes("You are now chatting with")) {
                sendMessage(); // Invia il messaggio automatico
            }
        }
    });
});

// Configura l'osservatore per monitorare i cambiamenti nella pagina
observer.observe(document.body, {
    childList: true,
    subtree: true
});
