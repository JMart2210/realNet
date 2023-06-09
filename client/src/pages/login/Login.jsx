import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material"
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value },
      dispatch);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">The Digital Lab</h3>
          <span className="loginDesc">
            Connect with friends and the world around you
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input 
              type="email" 
              placeholder="Email" 
              className="loginInput" 
              ref={email} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="loginInput" 
              ref={password}
              minLength="6"
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" /> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
          </form>
          <Link to="/" className="loginRegisterLink">No account? Register here!</Link>
        </div>
      </div>
    </div>
  );
}
