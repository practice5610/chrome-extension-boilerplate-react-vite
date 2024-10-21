import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('runtime content view loaded');

    // Check if the user is on the correct URL
    const currentUrl = window.location.href;
    const targetUrl = 'https://staging.gotiking.com/login';

    // Redirect if not on the target URL
    if (currentUrl !== targetUrl) {
      window.location.href = targetUrl;
      const randomPhoneNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
      console.log('checkinput field23');
      // Wait for the page to load before adding the number to the input field
      const inputField = document.querySelector('input[name="phone"]');
      console.log('checkinput field', inputField);
      if (inputField) {
        inputField.value = randomPhoneNumber;
      }
    } else {
      // Generate a random 9-digit number
      const randomPhoneNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
      console.log('checkinput field23');
      // Wait for the page to load before adding the number to the input field
      const inputField = document.querySelector('input[name="phone"]');
      console.log('checkinput field', inputField);
      if (inputField) {
        inputField.value = randomPhoneNumber;
      }
    }
  }, []);

  return <div className="runtime-content-view-text">runtime content view</div>;
}
