// define the AuthReducer function, which takes the current state and an action and returns the new state
const AuthReducer = (state, action) => {
  switch (action.type) {
    // case for when the login process starts. It resets the user data and sets isFetching to true
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    // case for when the login process is successful. It sets the user data and sets isFetching to false
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    // case for when the login process fails. It resets the user data, sets isFetching to false and sets the error message
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };

    // case for when the user starts following another user. It adds the new user to the list of users the current user is following
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };

    // case for when the user stops following another user. It removes the user from the list of users the current user is following
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (following) => following !== action.payload
          ),
        },
      };

    // default case returns the current state without any changes
    default:
      return state;
  }
}

// export the AuthReducer function as the default export
export default AuthReducer;
