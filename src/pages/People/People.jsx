import React, { useState, useEffect, useRef } from "react";
import "./People.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import Request from "./Request";

export default function People() {
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);

  const connectRequests = useSelector(
    (state) => state.auth.user.connectRequests
  );

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="people">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Requests</h1>
          {connectRequests.map((u) => (
            <Request key={u} userId={u} />
          ))}
        </>
      )}
    </div>
  );
}
