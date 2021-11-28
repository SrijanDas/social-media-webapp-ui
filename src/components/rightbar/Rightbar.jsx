import "./rightbar.css";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "../../axios";
import { useSelector } from "react-redux";
import ProfileBanner from "../ProfileBanner/ProfileBanner";

export default function Rightbar() {
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);
  const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users/suggest", {
          headers: {
            authorization: `Bearer ${token}`,
          },
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
    }, 1000);
  }, [currentUser._id, token]);

  return (
    <div className="rightbar">
      {loading ? (
        <Loader />
      ) : (
        <div className="rightbar__userList">
          <span className="rightbar__userListHeader">People you may know</span>
          {users.map((u) => (
            <ProfileBanner key={u._id} user={u} />
          ))}

          <div className="rightbar__userListSeeMore">
            <Link className="rightbar__userListSeeMoreLink" to="/people">
              See More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
