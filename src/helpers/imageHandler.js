// firebase
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export const uploadProfilePhoto = async (userEmail, file, fileName) => {
  try {
    const storageRef = ref(storage, `${userEmail}/profile/${fileName}`);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
      return 0;
    });
  } catch (error) {
    console.log(error);
    return 1;
  }
};
