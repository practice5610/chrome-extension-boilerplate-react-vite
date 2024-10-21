import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';

  const handleLoginClick = async () => {
    // Redirect to the login page
    const url = 'https://staging.gotiking.com/login';
    const phoneNumber = '9894853434';

    // Open the login URL in a new tab
    const newTab = await chrome.tabs.create({ url });

    // Wait for the tab to load and then inject the phone number and click the button
    if (newTab.id) {
      chrome.scripting.executeScript({
        target: { tabId: newTab.id },
        func: async phone => {
          const inputField = document.querySelector('input[name="phone"]');
          const otpButton = document.querySelector('button.btn.btn-primary.text-uppercase');

          if (inputField) {
            inputField.focus();
            inputField.select();

            for (const digit of phone) {
              inputField.value += digit;
              const event = new Event('input', { bubbles: true });
              inputField.dispatchEvent(event);
              console.log('Current input:', inputField.value);
              await new Promise(resolve => setTimeout(resolve, 200));
            }

            console.log('Final input:', inputField.value);
          }

          if (otpButton) {
            otpButton.click(); // Click the Get OTP button

            // Wait for redirect and then handle OTP entry
            await new Promise(resolve => setTimeout(resolve, 3000)); // Adjust wait time if needed

            // Now fill the OTP
            const otpDigits = ['1', '2', '3', '4', '5', '6']; // Simulate a valid OTP

            const otpInputs = document.querySelectorAll('.py-6 input'); // Select all input fields inside the .py-6 div

            otpDigits.forEach(async (digit, index) => {
              const inputField = otpInputs[index]; // Use the index to pick the correct input field
              console.log('checkinput', digit, index, inputField);
              if (inputField) {
                inputField.value = digit; // Set the input value
                const inputEvent = new Event('input', { bubbles: true });
                const changeEvent = new Event('change', { bubbles: true });
                inputField.dispatchEvent(inputEvent);
                inputField.dispatchEvent(changeEvent);
                await new Promise(resolve => setTimeout(resolve, 200));
              }
            });

            // Click the Verify button
            const verifyButton = document.querySelector('button.btn.btn-primary.text-uppercase');
            if (verifyButton) {
              verifyButton.click(); // Click the Verify button
            }
          }
        },
        args: [phoneNumber], // Pass the phone number
      });
    }
  };

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <button
          className={
            'font-bold mt-4 py-2 px-4 rounded shadow hover:scale-105 ' +
            (isLight ? 'bg-blue-200 text-black' : 'bg-gray-700 text-white')
          }
          onClick={handleLoginClick}>
          Logintest
        </button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading ...</div>), <div>Error Occurred</div>);
