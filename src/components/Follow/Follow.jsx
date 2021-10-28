import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function Follow() {
  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Follow
      </Button>
    </div>
  );
}
