import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import OtpInput from "react-otp-input";
import axios from "../../axios";

export default function OtpForm({
  handleNext,
  handleBack,
  handleOtpChange,
  otp,
  verificationToken,
  email,
  resendOtp,
}) {
  const [counter, setCounter] = React.useState(59);
  const [error, setError] = React.useState(null);

  const handleSubmit = async () => {
    setError(null);

    const body = {
      otp: otp,
      verification_key: verificationToken,
      check: email,
    };

    await axios
      .post("/verifyOtp", body)
      .then((res) => {
        if (res.data.Status === "Success") {
          handleNext();
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong! Please try again.");
      });
  };

  React.useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter OTP
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OtpInput
            className="register__otpInput"
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            separator={<span> - </span>}
          />
        </Grid>
        <Grid item xs={12}>
          <Button disabled={counter > 0} onClick={resendOtp}>
            Resend OTP
          </Button>
          {counter > 0 && (
            <Typography variant="caption" color="GrayText">
              in <strong>00:{counter}</strong>
            </Typography>
          )}
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert className="register__alert" severity="error">
              {error}
            </Alert>
          </Grid>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={counter > 0}
          sx={{ mt: 3, ml: 1 }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          disabled={otp.length !== 6}
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
