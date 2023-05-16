import "./register.css";
import { useRef } from "react";
import { CircularProgress } from "@mui/material"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
  // Initialize references for form inputs
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  // Initialize the useNavigate hook for redirecting user after successful registration
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    // Check if the password and password confirmation match
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      // If they match, create a user object
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      // Try to send a post request to the server with the new user's data
      try {
        await axios.post("/auth/signup", user);
        // If successful, navigate the user to the login page
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
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
            <input required 
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input required
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input required
              type="password" 
              placeholder="Password"
              className="loginInput"
              ref={password}
              minLength="6"
            />
            <input required
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
              ref={passwordAgain}
            />
            <button type="submit" className="loginButton" >Sign Up</button>
          </form>
          <Link to="/login" className="loginRegisterLink">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
}
