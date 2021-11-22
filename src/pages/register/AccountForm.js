import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import axios from "../../axios";

export default function AccountForm({ handleNext, email }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
          if (res.data === "success") handleNext();
          else setUserCreationError("Something went wrong!");
        } catch (error) {
          console.log(error);
          setUserCreationError("Something went wrong!");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create your account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            type="text"
            required
            autoFocus
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            required
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password Again"
            type="password"
            variant="standard"
            required
            fullWidth
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {userCreationError && (
            <Alert className="register__alert" severity="error">
              {userCreationError}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} type="submit">
          Create Account
        </Button>
      </Box>
    </form>
  );
}
