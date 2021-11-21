import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function AccountForm({ handleNext }) {
  return (
    <React.Fragment>
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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Password Again"
            type="password"
            variant="standard"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={handleNext}>
          Create Account
        </Button>
      </Box>
    </React.Fragment>
  );
}
