import { mount } from '@src/Root';

mount();
console.log('test run time');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message from the background scripddt:');
  console.log(request.greeting);

  // Send a response back
  sendResponse({ response: 'Hi from content script' });

  // Return true to indicate you want to send a response asynchronously
  return true;
});
