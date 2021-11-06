import React, { useEffect, useState, useRef } from "react";
import { checkAuthenticated } from "../store/actions/authActions";
import ScrollToTop from "../components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";

function Layout({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const [isLoading, setIsLoading] = useState(true);

  const timer = useRef();
  useEffect(() => {
    dispatch(checkAuthenticated());
    timer.current = window.setTimeout(() => {
      if (isFetching === false) {
        setIsLoading(false);
      }
    }, 2000);
  }, [dispatch]);

  return isLoading ? (
    <div className={classes.layoutLoader}>
      <h1 className={classes.logoText}>siu</h1>
      <Loader size={50} />
    </div>
  ) : (
    <div className={classes.root}>
      {user ? <Navbar /> : null}
      <ScrollToTop />
      {children}
    </div>
  );
}

export default Layout;
