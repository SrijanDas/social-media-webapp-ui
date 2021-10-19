import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "../../axios";
import { useHistory } from "react-router";
import { Button, TextField } from "@mui/material";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [userCreationError, setUserCreationError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/users?username=${username.current.value}`);
    console.log(res);
    if (res.status === 200) {
      setUserCreationError("username already taken");
      return;
    } else if (res.status === 500) {
      console.log("user");
      if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        console.log(user);
        try {
          // await axios.post("/auth/register", user);
          history.push("/login");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="register">
      <div className="register__left">
        <h3 className="loginLogo">Socials</h3>
        <span className="loginDesc">
          Connect with friends and the world around you on Socials.
        </span>
      </div>

      <div className="register__right">
        <form className="register__form" onSubmit={handleSubmit}>
          <TextField label="Username" type="text" variant="outlined" required />
          <TextField label="Email" type="email" variant="outlined" required />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
          />
          <TextField
            label="Password Again"
            type="password"
            variant="outlined"
            required
          />

          <Button
            type="submit"
            className="register__btn"
            variant="contained"
            disableElevation
          >
            Create Account
          </Button>

          {userCreationError ? (
            <div className="register__alert">
              <span>{userCreationError}</span>
            </div>
          ) : (
            ""
          )}
        </form>
        <Link className="register__loginLink" to="/login">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
}
