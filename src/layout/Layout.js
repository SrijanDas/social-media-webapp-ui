import React, { useEffect, useState, useRef } from "react";
import { checkAuthenticated } from "../store/actions/authActions";
import ScrollToTop from "../components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Rightbar from "../components/Rightbar/Rightbar";
import { isMobile } from "react-device-detect";

function Layout({ children }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const [isLoading, setIsLoading] = useState(true);
  const showSidebar = isMobile ? false : true;
  const timer = useRef();

  useEffect(() => {
    dispatch(checkAuthenticated());
    timer.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch]);

  return isLoading && isFetching ? (
    <div className={classes.layoutLoader}>
      <h1 className={classes.logoText}>siu</h1>
      <Loader size={50} />
    </div>
  ) : (
    <div className={classes.root}>
      {user ? (
        <>
          <Navbar />
          <ScrollToTop />
          <div className="pageContainer">
            <div className="page">
              {showSidebar && <Sidebar />}
              <div className="pageContent">{children}</div>
              {showSidebar && <Rightbar />}
            </div>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}

export default Layout;
