import { useRef } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "../../axios";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const history = useHistory();

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
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socials</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socials.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              required
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input
              required
              type="email"
              placeholder="Email"
              ref={email}
              className="loginInput"
            />
            <input
              required
              type="password"
              ref={password}
              placeholder="Password"
              className="loginInput"
              minLength="6"
            />
            <input
              required
              type="password"
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
              minLength="6"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              <Link className="loginRegisterButtonText" to="/login">
                Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
