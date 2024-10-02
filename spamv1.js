// Function to start the spam
function startSpam(text, ms) {
    window.spamInterval = setInterval(() => {
      const input = document.querySelector('input[type="text"]');  
      const form = document.querySelector('form'); 
      const sendButton = document.querySelector('button');  
  
      if (input) {
        input.value = text;
  
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
  
        if (sendButton) {
          sendButton.click();
        }
  
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      }
    }, ms);
  }
  
  // Function to stop the spam
  function stopSpam() {
    clearInterval(window.spamInterval);
  }
  
  // Function to save data to Chrome's local storage
  function saveData(text, ms) {
    if (text && ms) {
      chrome.storage.local.set({ spamText: text, spamMs: ms }, () => {
        console.log('Data saved:', text, ms);
      });
    } else {
      console.log('Data not valid, data not saved');
    }
  }
  
  
  // Function to load data from Chrome's local storage
  function loadData() {
    chrome.storage.local.get(['spamText', 'spamMs'], (data) => {
      console.log('Data loaded:', data);
      if (data.spamText) {
        document.getElementById('text').value = data.spamText;
      }
      if (data.spamMs) {
        document.getElementById('ms').value = data.spamMs;
      }
    });
  }
  
  // Listener for the "start" button
  document.getElementById('startv1').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    const ms = document.getElementById('ms').value;
  
    // save data
    saveData(text, ms);
  
    // start the spam script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: startSpam,
        args: [text, ms]
      });
    });
  });
  
  // Listener for the "stop" button
  document.getElementById('stopv1').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: stopSpam
      });
    });
  });
  
  // load the data when the extension is opened
  document.addEventListener('DOMContentLoaded', () => {
    loadData();  
  });