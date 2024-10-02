// Function to start the spam
function startSpam(text) {
    let messageSent = false; 
  
    window.spamInterval = setInterval(() => {
      const input = document.querySelector('input[type="text"]');  
      const form = document.querySelector('form'); 
      const sendButton = document.querySelector('button');  
      
      // Function to skip the chat
      function skip() {
        let skipButton = document.getElementById('next');
        if (skipButton) {
          skipButton.click();
          console.log("Chat Skipped");
          messageSent = false; 
        }
      }
  
      if (input && !messageSent) { 
        input.value = text;
  
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
  
        if (sendButton) {
          sendButton.click();
          messageSent = true; 
          console.log("Message Sent");
        }
  
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
  
        setTimeout(skip, 5000); 
      }
    });
  }
  
  
  
  
  // Function to stop the spam
  function stopSpam() {
    clearInterval(window.spamInterval);
  }
  
  // Function to save data to Chrome's local storage
  function saveData(text) {
    if (text) {
      chrome.storage.local.set({ spamText2: text}, () => {
        console.log('Data saved:', text);
      });
    } else {
      console.log('Data not valid, data not saved');
    }
  }
  
  
  // Function to load data from Chrome's local storage
  function loadData() {
    chrome.storage.local.get(['spamText2'], (data) => {
      console.log('Data loaded:', data);
      if (data.spamText2) {
        document.getElementById('textV2').value = data.spamText2;
      }
    });
  }
  
  // Listener for the "start" button
  document.getElementById('startv2').addEventListener('click', () => {
    const text = document.getElementById('textV2').value;
  
    // save data
    saveData(text);
  
    // start the spam script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: startSpam,
        args: [text]
      });
    });
  });
  
  // Listener for the "stop" button
  document.getElementById('stopv2').addEventListener('click', () => {
    console.log('Stop button clicked');
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