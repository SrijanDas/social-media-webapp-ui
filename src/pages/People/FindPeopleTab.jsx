import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import ProfileBanner from "../../components/ProfileBanner/ProfileBanner";
import axios from "../../axios";
import { useSelector } from "react-redux";

function FindPeopleTab() {
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
    <div className="findPeopleTab">
      <div className="findPeopleTab__searchForm bg-grey">
        <SearchIcon color="inherit" />
        <input
          className="findPeopleTab__searchInput"
          placeholder="search for people..."
          type="text"
        />
      </div>
      <div className="findPeopleTab__suggestions">
        <h2 className="findPeopleTab__suggestionsHeader">
          People you may know
        </h2>
        {loading ? (
          <Loader />
        ) : (
          users.map((u) => <ProfileBanner key={u._id} user={u} />)
        )}
      </div>
    </div>
  );
}

export default FindPeopleTab;
