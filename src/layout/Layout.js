import React, { useEffect } from "react";
import { load_user } from "../store/actions/authActions";
import ScrollToTop from "../components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import Navbar from "../components/Navbar/Navbar";

function Layout({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(load_user());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {user ? <Navbar /> : null}
      <ScrollToTop />
      {children}
    </div>
  );
}

export default Layout;
