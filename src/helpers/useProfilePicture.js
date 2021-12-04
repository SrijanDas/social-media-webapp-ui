// firebase imports
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

import { useState, useEffect } from "react";
import DefaultProfilePic from "../assets/profile.png";

const useProfilePic = (user) => {
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  // getting profile pic from firebase storage
  useEffect(() => {
    const getProfilePic = async () => {
      if (!user.profilePicture) return setProfilePic(DefaultProfilePic);

      await getDownloadURL(
        ref(storage, `${user.email}/profile/${user.profilePicture}`)
      )
        .then((url) => setProfilePic(url))
        .catch((e) => console.log(e));
    };
    if (user) getProfilePic();
  }, [user]);

  return profilePic;
};
export default useProfilePic;
