// import the necessary pages which represent the different screens in our app
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

// import the necessary components from react-router-dom to handle routing in our app
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import useContext, a hook to let us use the value of a context
import { useContext } from "react";

// import AuthContext to access the authentication data across the app
import { AuthContext } from "./context/AuthContext.js";

// define the main App component
function App() {

  // useContext hook allows us to use the value of AuthContext. In this case, we're extracting the user object
  const { user } = useContext(AuthContext);

  // return the component JSX
  return (
    // Router is a component that keeps the UI in sync with the URL
    <Router>
    
      {/* // Routes is a component that allows us to define multiple routes */}
      <Routes>
      
        {/* // Route is a component that renders some UI when its path matches the current URL

        // Here we have a route for the path "/", the homepage of the website
        // If the user is logged in, it renders the Home component, otherwise it renders the Register component */}
        <Route path="/" 
          element={user ? 
            <Home /> : 
            <Register />} />
            
        {/* // This route is for the "/login" path. If the user is already logged in, it redirects to the homepage. Otherwise, it renders the Login component */}
        <Route path="/login"
          element={user ? 
          <Navigate to="/" /> :
          <Login />}
        />
        
        {/* // This route is for the "/register" path. If the user is already logged in, it redirects to the homepage. Otherwise, it renders the Register component */}
        <Route
          path="/register"
          element={user ? 
          <Navigate to="/" /> : 
          <Register />}
        />
        
        {/* // This route is for the "/profile/:username" path. It renders the Profile component. ":username" is a URL parameter, and its value can be accessed in the Profile component */}
        <Route path="/profile/:username" 
          element={<Profile />} />
          
      </Routes>
    </Router>
  );
}

// export the App component as the default export
export default App;
