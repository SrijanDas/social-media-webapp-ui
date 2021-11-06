import React from "react";
import Avatar from "@mui/material/Avatar";
import StyledBadge from "./StyledBadge";

import "./OnlineCard.css";

export default function OnlineCard() {
  return (
    <div className="onlineCard">
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src="" />
      </StyledBadge>
      <span className="onlineCard__username">Elon Musk</span>
    </div>
  );
}
