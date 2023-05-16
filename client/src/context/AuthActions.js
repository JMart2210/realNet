// This file contains the definitions for different actions that can be dispatched to the AuthReducer to alter the state of the application. Each function returns an action object containing a type property (which defines the type of action) and optionally a payload property (which carries any extra information that is required for the action).

// Action dispatched when login process starts, takes userCredentials as argument
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

// Action dispatched when login process is successful, takes user object as argument
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

// Action dispatched when login process fails, takes error as argument
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

// Action dispatched when a user follows another user, takes userId as argument
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

// Action dispatched when a user unfollows another user, takes userId as argument
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
