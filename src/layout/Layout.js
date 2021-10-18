import React, { useEffect } from "react";
import { checkAuthenticated } from "../store/actions/authActions";
import ScrollToTop from "../components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";

function Layout({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const isFetching = useSelector((state) => state.auth.isFetching);

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  return isFetching ? (
    <div className={classes.layoutLoader}>
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
