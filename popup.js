document.getElementById('start').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const ms = document.getElementById('ms').value;
  
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: startSpam,
        args: [text, ms]
      });
    });
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: stopSpam
      });
    });
  });
  
  function startSpam(text, ms) {
    window.spamInterval = setInterval(() => {
      // find the input element and send the text
      const input = document.querySelector('input[type="text"]');  
      const sendButton = document.querySelector('button');  
  
      if (input && sendButton) {
        input.value = text;
        sendButton.click();
      }
    }, ms);
  }
  
  function stopSpam() {
    clearInterval(window.spamInterval);
  }
  