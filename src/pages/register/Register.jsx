import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "../../axios";
import { useHistory } from "react-router";
import { Alert, Button, TextField } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [userCreationError, setUserCreationError] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    if (password.length < 6)
      setUserCreationError("Password must be atleast 6 characters long.");
    if (password !== password2) setUserCreationError("Passwords don't match!");
  };

  return (
    <div className="loginPage">
      <div className="login">
        <div className="loginLeft">
          <h3 className="loginLogo">Socials</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socials.
          </span>
        </div>

        <div className="loginRight">
          <form className="login__form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Password Again"
              type="password"
              variant="outlined"
              required
              onChange={(e) => setPassword2(e.target.value)}
            />
            {userCreationError ? (
              <Alert className="register__alert" severity="error">
                {userCreationError}
              </Alert>
            ) : (
              ""
            )}

            <Button
              type="submit"
              className="login__btn"
              variant="contained"
              disableElevation
            >
              Create Account
            </Button>
          </form>
          <div className="register__loginLinkContainer">
            <Link className="register__loginLink" to="/login">
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
