import React from "react";
import "./Loader.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ size }) {
  return (
    <div className="loader">
      <CircularProgress size={size} />
    </div>
  );
}
