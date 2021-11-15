import React, { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

import "./FeedbackForm.css";
import axios from "../../axios";
import { useSelector } from "react-redux";

const options = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "enhancement ",
    label: "Enhancement ",
  },
];

function Feedback({ open, handleClose }) {
  const [desc, setDesc] = useState("");

  const user = useSelector((state) => state.auth.user);

  const [option, setOption] = useState("bug");
  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSnackbarClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const body = {
      userId: user._id,
      type: option,
      details: desc,
    };
    await axios.post("/feedback/new", body).then((res) => {
      if (res.status === 200) {
        handleClose();
        setAlertOpen(true);
      } else {
        alert("Something went wrong!");
      }
    });
    setDesc("");

    setIsSubmitting(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {"Feedback"}
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
        <Divider />
        <DialogContent>
          <div className="feedback__typeContainer">
            <Typography gutterBottom>Type</Typography>
            <TextField
              id="feedback-select-type"
              select
              value={option}
              onChange={handleOptionChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Typography gutterBottom>Details</Typography>
          <TextareaAutosize
            type="text"
            minRows={5}
            placeholder="Describe your issue..."
            onChange={(e) => setDesc(e.target.value)}
            className="feedback__form"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={desc === "" || isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Feedback submitted"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default Feedback;
