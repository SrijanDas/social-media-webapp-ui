import * as actionTypes from "./followActionTypes";
import axios from "../../axios";

export const sendConnectionRequest =
  (userId, currentUserId) => async (dispatch) => {
    try {
      const res = await axios.put(`/users/${userId}/connect`, {
        userId: currentUserId,
      });
      if (res.status === 200)
        dispatch({
          type: actionTypes.CONNECTION_REQUEST_SENT,
          payload: userId,
        });
    } catch (error) {
      console.log(error);
      dispatch({ type: actionTypes.CONNECTION_REQUEST_SEND_FAILED });
    }
  };
export const disconnectUser = (userId, currentUserId) => async (dispatch) => {
  try {
    const res = await axios.put(`/users/${userId}/disconnect`, {
      userId: currentUserId,
    });
    if (res.status === 200)
      dispatch({ type: actionTypes.DISCONNECTED_USER, payload: userId });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.DISCONNECTED_USER_FAIL });
  }
};

export const acceptConnectionRequest =
  (userId, currentUserId) => async (dispatch) => {
    try {
      const res = await axios.put(`/users/${currentUserId}/accept`, {
        userId,
      });
      if (res.status === 200)
        dispatch({
          type: actionTypes.CONNECTION_REQUEST_ACCEPTED,
          payload: userId,
        });
    } catch (error) {
      console.log(error);
      dispatch({ type: actionTypes.CONNECTION_REQUEST_ACCEPT_FAILED });
    }
  };

export const rejectConnectionRequest =
  (userId, currentUserId) => async (dispatch) => {
    try {
      const res = await axios.put(`/users/${currentUserId}/reject`, {
        userId,
      });
      if (res.status === 200)
        dispatch({
          type: actionTypes.CONNECTION_REQUEST_REJECT,
          payload: userId,
        });
    } catch (error) {
      console.log(error);
      dispatch({ type: actionTypes.CONNECTION_REQUEST_REJECT_FAILED });
    }
  };
