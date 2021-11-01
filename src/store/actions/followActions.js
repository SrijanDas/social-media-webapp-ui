import * as actionTypes from "./followActionTypes";
import axios from "../../axios";

export const followUser = (userId, currentUserId) => async (dispatch) => {
  try {
    const res = await axios.put(`/users/${userId}/follow`, {
      userId: currentUserId,
    });
    if (res.status === 200)
      dispatch({ type: actionTypes.FOLLOWED, payload: userId });
    else dispatch({ type: actionTypes.FOLLOW_FAIL });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.FOLLOW_FAIL });
  }
};
export const unFollowUser = (userId, currentUserId) => async (dispatch) => {
  try {
    const res = await axios.put(`/users/${userId}/unfollow`, {
      userId: currentUserId,
    });
    if (res.status === 200)
      dispatch({ type: actionTypes.UNFOLLOWED, payload: userId });
    else dispatch({ type: actionTypes.UNFOLLOW_FAIL });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.UNFOLLOW_FAIL });
  }
};
