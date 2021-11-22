import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../axios";
import { Link } from "react-router-dom";

export default function EmailForm({
  handleEmailChange,
  email,
  setEmail,
  isLoading,
  setIsLoading,
  sendOTP,
}) {
  const [showAlert, setShowAlert] = React.useState(false);
  const [captchaChecked, setCaptchaChecked] = React.useState(false);

  const handleSubmit = async () => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/check-email", { email });
      if (res.data === "available") {
        setEmail(email);
        sendOTP();
      } else {
        setShowAlert(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function onChange(value) {
    setCaptchaChecked(true);
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Email address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            fullWidth
            variant="standard"
            type="email"
            autoFocus
            onChange={handleEmailChange}
            value={email}
          />
        </Grid>
        {showAlert && (
          <Grid item xs={12}>
            <Alert className="register__alert" severity="error">
              Email is already taken
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link className="register__loginLink" to="/login">
          <Button disabled={isLoading} sx={{ mt: 3 }}>
            Log in to your account
          </Button>
        </Link>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          disabled={email === "" || isLoading || !captchaChecked}
          onClick={handleSubmit}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} /> : "Next"}
        </Button>
      </Box>
    </React.Fragment>
  );
}
