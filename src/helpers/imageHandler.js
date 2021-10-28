// firebase
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export const getProfileImage = async (userEmail, profilePicture) => {
  await getDownloadURL(
    ref(storage, `${userEmail}/profile/${profilePicture}.jpg`)
  )
    .then((url) => {
      return url;
    })
    .catch((e) => console.log(e));
};
