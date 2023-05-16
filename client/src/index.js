// import the React library which is needed for creating React components
import React from 'react';

// import the createRoot method from react-dom/client. This is used for concurrent mode in React
import { createRoot } from 'react-dom/client';

// import the main App component from the current directory
import App from './App';

// import the AuthContextProvider. This is a React Context which is used to provide authentication data to all components in the app
import { AuthContextProvider } from './context/AuthContext';

// This starts the rendering of the application into the 'root' div in the index.html file.
// createRoot creates a root for your app on the HTML element with id 'root' 
createRoot(document.getElementById('root')).render(

  // StrictMode is a wrapper component that checks for potential problems in the application during the development build
  <React.StrictMode>

    {/* // AuthContextProvider wraps the App to ensure all components in App have access to the authentication context */}
    <AuthContextProvider>

      {/* // App is the main component of our application */}
      <App />

    </AuthContextProvider>

  </React.StrictMode>
);
