import React, { useState, useEffect, useRef } from "react";
import Request from "./Request";
import Loader from "../../components/Loader/Loader";

function RequestsTab({ connectRequests }) {
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="requests-tab">
      {connectRequests.length
        ? connectRequests.map((u) => <Request key={u} userId={u} />)
        : "No requests"}
    </div>
  );
}

export default RequestsTab;
