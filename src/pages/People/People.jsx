import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./People.css";
import ProfileBanner from "../../components/ProfileBanner/ProfileBanner";
import Loader from "../../components/Loader/Loader";
import axios from "../../axios";
import { useSelector } from "react-redux";

export default function People() {
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);
  const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users/suggest", {
          userId: currentUser._id,
        });
        setUsers(res.data);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    };
    timer.current = window.setTimeout(() => {
      fetchUsers();
      setLoading(false);
    }, 500);
  }, [currentUser._id]);

  return (
    <div className="pageContainer">
      <div className="page">
        <Sidebar className="sidebar" />
        <div className="pageContent">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1>People you may know</h1>
              {users.map((u) => (
                <ProfileBanner user={u} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
