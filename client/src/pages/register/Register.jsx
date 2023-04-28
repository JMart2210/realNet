import "./register.css";
import { useRef } from "react";
import { CircularProgress } from "@mui/material"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        try {
          await axios.post("/auth/signup", user);
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
            {/* <button type="submit" className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" /> : "Sign Up"}</button> */}
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
