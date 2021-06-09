import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginLeft">
          <h3 className="loginLogo">Socials</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socials.
          </span>
        </div>
        <div className="loginRight">
          <div className="login__formContainer">
            <form className="login__form" onSubmit={handleClick}>
              <input placeholder="Email" type="email" required ref={email} />
              <input
                placeholder="Password"
                type="password"
                required
                minLength="6"
                ref={password}
              />
              <button
                className="login__btn"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="login__Forgot">Forgot Password?</span>
            </form>
          </div>
          <div className="login__RegisterButtonContainer">
            <Link to="/register">
              <button className="login__RegisterButton">
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
