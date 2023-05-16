// This file creates a context for authentication and a context provider component. The provider component uses the useReducer hook to manage state and the useEffect hook to update local storage whenever the user state changes. The context is then used by other components to access the user's authentication state and the dispatch function for updating it.
// Import createContext to create a new context, useEffect to perform side effects, and useReducer to manage state
import { createContext, useEffect, useReducer } from "react";

// Import the reducer function for authentication
import AuthReducer from "./AuthReducer";

// Define the initial state
const INITIAL_STATE = {
  // Retrieve the user from local storage if it exists, otherwise set to null
  user:JSON.parse(localStorage.getItem("user")) || null,
  // Initialize the fetching state as false
  isFetching: false,
  // Initialize the error state as false
  error: false,
};

// Create a new context for authentication
export const AuthContext = createContext(INITIAL_STATE);

// Define a context provider component
export const AuthContextProvider = ({ children }) => {
  // Use the useReducer hook to provide state and dispatch function
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Use the useEffect hook to perform side effects
  useEffect(()=>{
    // When the user state changes, update the user in local storage
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  // Render the provider component and pass in the state and dispatch function as the context value
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
