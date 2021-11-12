import React, { useState, useEffect, useRef } from "react";
import "./People.css";
import ProfileBanner from "../../components/ProfileBanner/ProfileBanner";
import Loader from "../../components/Loader/Loader";
import axios from "../../axios";
import { useSelector } from "react-redux";

export default function People() {
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("access");

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users/suggest", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        console.log(res.data);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    };
    timer.current = window.setTimeout(() => {
      fetchUsers();
      setLoading(false);
    }, 1000);
  }, [currentUser._id, token]);

  return (
    <div className="people">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>People you may know</h1>
          {users.map((u) => (
            <ProfileBanner key={u._id} user={u} />
          ))}
        </>
      )}
    </div>
  );
}
