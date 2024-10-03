// Function to start the spam
function startSpam(text, ms, version) {
    let messageSent = false;
  
    window.spamInterval = setInterval(() => {
      const input = document.querySelector('input[type="text"]');
      const form = document.querySelector('form');
      const sendButton = document.getElementById('send');
  
      function skip() {
        let skipButton = document.getElementById('next');
        if (skipButton && version === "v2") {
          skipButton.click();
          messageSent = false; 
        }
      }
  
      if (input && (version === "v1" || !messageSent)) {
        input.value = text;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
  
        if (sendButton) {
          sendButton.click();
          if (version === "v2") {
            messageSent = true; 
          }
        }
  
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
  
        if (version === "v2") {
          setTimeout(skip, 5000); 
        }
      }
    }, ms);
  }
  
  
  // Function to stop the spam
  function stopSpam() {
    clearInterval(window.spamInterval);
  }
  
  // Function to save the data
  function saveData(text, ms, version) {
    const data = version === "v1" ? { spamText: text, spamMs: ms } : { spamText2: text };
    chrome.storage.local.set(data, () => {
      console.log('Dati salvati:', data);
    });
  }
  
  // Function to load the data
  function loadData(version) {
    const keys = version === "v1" ? ['spamText', 'spamMs'] : ['spamText2'];
    chrome.storage.local.get(keys, (data) => {
      if (version === "v1") {
        if (data.spamText) document.getElementById('text').value = data.spamText;
        if (data.spamMs) document.getElementById('ms').value = data.spamMs;
      } else if (version === "v2") {
        if (data.spamText2) document.getElementById('textV2').value = data.spamText2;
      }
    });
  }
  
  // Listener for the start of V1
  document.getElementById('startv1').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const ms = document.getElementById('ms').value;
  
    saveData(text, ms, 'v1');
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: startSpam,
        args: [text, ms, 'v1']
      });
    });
  });
  
  // Listener for the stop V1
  document.getElementById('stopv1').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopSpam
      });
    });
  });
  
  // Listener for the start V2
  document.getElementById('startv2').addEventListener('click', () => {
    const text = document.getElementById('textV2').value;
  
    saveData(text, null, 'v2');
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: startSpam,
        args: [text, null, 'v2']
      });
    });
  });
  
  // Listener for the stop V2
  document.getElementById('stopv2').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopSpam
      });
    });
  });
  
  // Load data 
  document.addEventListener('DOMContentLoaded', () => {
    loadData('v1');
    loadData('v2');
  });
  