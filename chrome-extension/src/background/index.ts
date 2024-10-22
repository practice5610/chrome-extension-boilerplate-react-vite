import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message from the background script232:');
  console.log(request.greeting);

  // Send a response back
  sendResponse({ response: 'Hi from content script' });

  // Return true to indicate you want to send a response asynchronously
  return true;
});
