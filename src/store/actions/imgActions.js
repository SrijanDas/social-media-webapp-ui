import * as actionTypes from "./imgActionTypes";

// firebase imports
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

export const loadProfilePhoto = (user) => async (dispatch) => {
  await getDownloadURL(
    ref(storage, `${user.email}/profile/${user.profilePicture}`)
  )
    .then((url) => {
      dispatch({
        type: actionTypes.PROFILE_PHOTO_LOADED,
        payload: url,
      });
    })
    .catch((e) => {
      dispatch({
        type: actionTypes.PROFILE_PHOTO_LOADED_FAIL,
        payload: e,
      });
    });
};
