import { mount } from '@src/Root';

mount();
console.log('test run time');

// Save session storage data
const sessionData1 = { test: 'test' };

// Log session storage data
console.log('Session Storage Data:', sessionData1);

// Save session storage to Chrome storage (sync)
chrome.storage.sync.set({ sessionData1 }, function () {
  console.log('Session storage data saved to sync storage.');
});

chrome.storage.sync.get(['sessionData'], function (result) {
  console.log('Retrieved session storage data:', result.sessionData);
});
async function getCurrentTabUrl() {
  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
  console.log('current tab', tab);
}

// Call the function to get the current tab URL
getCurrentTabUrl();
