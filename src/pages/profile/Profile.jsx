import "./profile.css";

import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router";

import DefaultCoverPic from "../../assets/cover.jpg";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useSelector } from "react-redux";
import Follow from "../../components/Follow/Follow";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ProfileCard from "./ProfileCard";
import Loader from "../../components/Loader/Loader";
import useProfilePic from "../../helpers/useProfilePicture";
import useIsMountedRef from "../../helpers/useIsMountedRef";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const userId = useParams().userId;
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    setIsLoading(true);

    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };

    if (isMountedRef.current) fetchUser();

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [userId, isMountedRef]);

  const coverPic = DefaultCoverPic;
  const profilePic = useProfilePic(user);

  return (
    <div className="profile">
      <div className="profileCover">
        <img className="profileCoverImg" src={coverPic} alt="" />
        <img className="profileUserImg" src={profilePic} alt="" />
      </div>
      <div className="profileInfo">
        <h4 className="profileInfoName">{user?.username}</h4>
        <span className="profileInfoDesc">{user?.desc}</span>

        {currentUser._id === userId ? <EditProfile /> : <Follow user={user} />}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user?.connections.length && (
            <div style={{ margin: "0.8rem 0" }}>
              <Divider />
              <div className="profile__connectionsContainer">
                <Typography variant="h6">Connections</Typography>
                <Typography variant="subtitle1">
                  {user?.connections.length} connections
                </Typography>
                <div className="profile__connections">
                  {user?.connections.map((connection) => (
                    <ProfileCard key={connection} userId={connection} />
                  ))}
                </div>
              </div>
              <Divider />
            </div>
          )}
          <Feed userId={userId} />
        </>
      )}
    </div>
  );
}
