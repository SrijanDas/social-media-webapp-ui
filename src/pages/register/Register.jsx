import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";
import AccountForm from "./AccountForm";
import "./register.css";
import axios from "../../axios";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © SIU "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Enter email", "Verify Email", "Create account"];

const theme = createTheme();

function Registerr() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [verificationToken, setVerificationToken] = React.useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const sendOTP = async () => {
    setOtp("");
    try {
      const body = {
        email: email,
        type: "VERIFICATION",
      };
      const res = await axios.post("/sendOtp/email", body);
      if (res.status === 200) {
        setVerificationToken(res.data.Details);
        handleNext();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <EmailForm
            email={email}
            setEmail={setEmail}
            handleNext={handleNext}
            handleEmailChange={handleEmailChange}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setVerificationToken={setVerificationToken}
            sendOTP={sendOTP}
          />
        );
      case 1:
        return (
          <OtpForm
            handleBack={handleBack}
            handleNext={handleNext}
            handleOtpChange={handleOtpChange}
            otp={otp}
            email={email}
            verificationToken={verificationToken}
            sendOTP={sendOTP}
          />
        );
      case 2:
        return <AccountForm email={email} handleNext={handleNext} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#f50057" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Alert className="register__successMsg" severity="success">
                  Account created successfully.
                </Alert>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Link className="register__successLoginLink" to="/login">
                    <Button>Log In</Button>
                  </Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default Registerr;
