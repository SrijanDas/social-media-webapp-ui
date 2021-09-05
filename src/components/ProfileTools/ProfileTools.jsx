import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import React from "react";
import "./ProfileTools.css";

export function ProfileToolsUser() {
  return (
    <div className="profileTools">
      <Button variant="contained" startIcon={<EditIcon />}>
        Edit Profile
      </Button>
    </div>
  );
}

export function ProfileToolsOthers() {
  return (
    <div className="profileTools">
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Follow
      </Button>
    </div>
  );
}
