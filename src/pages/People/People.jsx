import React, { useState } from "react";
import "./People.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RequestsTab from "./RequestsTab";
import FindPeopleTab from "./FindPeopleTab";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function People() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const connectRequests = useSelector(
    (state) => state.auth.user.connectRequests
  );

  return (
    <div className="people">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Find People" {...a11yProps(0)} />
            <Tab
              label={`Requests${
                connectRequests.length > 0 ? ` (${connectRequests.length})` : ""
              }`}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FindPeopleTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RequestsTab connectRequests={connectRequests} />
        </TabPanel>
      </Box>
    </div>
  );
}
