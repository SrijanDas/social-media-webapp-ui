import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Transition from "../Transition";
import "./ReportDialog.css";

export default function ReportDialog({ open, handleClose }) {
  const [reason, setReason] = useState([]);

  const [desc, setDesc] = useState("");

  const handleChange = (e, value) => {
    const checked = e.target.checked;
    if (checked === true) {
      setReason([...reason, value]);
    } else {
      const newReason = reason.filter((item) => item !== value);
      setReason(newReason);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(desc);
    console.log(reason);
  };

  const reasons = [
    "Nudity/Sexual Content",
    "Violence/Harm",
    "False Information",
    "Spam",
    "Other",
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {"Report"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          {reasons.map((reason, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={reason}
              onChange={(e) => handleChange(e, reason)}
            />
          ))}
        </FormGroup>
        <DialogContentText id="alert-dialog-description">
          Describe how it violates platform policies:
        </DialogContentText>
        <form className="report__form" onSubmit={handleSubmit}>
          <TextareaAutosize
            type="text"
            minRows={5}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button variant="contained" type="submit" disableElevation>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
