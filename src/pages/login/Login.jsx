import { useState } from "react";
import "./login.css";
import { loginCall } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginCall({
        email: email,
        password: password,
      })
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
            <form className="login__form" onSubmit={handleSubmit}>
              <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                type="email"
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password-input"
                label="Password"
                variant="outlined"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                disableElevation
                className="login__btn"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Log In"
                )}
              </Button>
              {error && <Alert severity="error">{error.message}</Alert>}
              <span className="login__Forgot">Forgot Password?</span>
            </form>
          </div>
          <Link to="/register" className="login__signUpLink">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
