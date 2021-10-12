import React, { useEffect } from "react";
import { load_user } from "../store/actions/authActions";
import ScrollToTop from "../components/ScrollToTop";
import { useDispatch } from "react-redux";
import useStyles from "./style";

function Layout({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(load_user());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <ScrollToTop />
      {children}
    </div>
  );
}

export default Layout;
