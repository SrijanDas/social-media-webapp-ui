import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "../../axios";
import { Alert, Button, TextField } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [userCreated, setUserCreated] = useState(false);

  const [userCreationError, setUserCreationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setUserCreationError("Password must be atleast 6 characters long.");
    } else {
      if (password !== password2)
        setUserCreationError("Passwords don't match!");
      else {
        try {
          const body = {
            username,
            email,
            password,
          };
          const res = await axios.post("/auth/register", body);
          if (res.data === "Email already exists.")
            setUserCreationError("Email already exists.");
          if (res.data === "Account created successfully.") {
            setUserCreated(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
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
          {userCreated ? (
            <Alert className="register__successMsg" severity="success">
              Account created successfully.{" "}
              <strong>
                <Link className="register__loginLink" to="/login">
                  Please login
                </Link>
              </strong>
            </Alert>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
