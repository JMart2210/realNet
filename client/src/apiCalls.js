// Import axios for making HTTP requests
import axios from "axios";

// Define a loginCall function that will be used to authenticate a user
export const loginCall = async (userCredential, dispatch) => {
  // Dispatch the LOGIN_START action to indicate that the login process has started
  dispatch({ type: "LOGIN_START" });
  try {
    // Send a post request to the server with the user's credentials
    const res = await axios.post("auth/login", userCredential);
    // If successful, dispatch the LOGIN_SUCCESS action and send the user data received from the server to the reducer
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    // If there's an error, dispatch the LOGIN_FAILURE action and send the error to the reducer
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
