import axios from "../../axios";
import * as actionTypes from "./authActionTypes";

export const load_user = () => async (dispatch) => {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({
        type: actionTypes.USER_LOADED_SUCCESS,
        payload: user,
      });
    } else {
      dispatch({
        type: actionTypes.USER_LOADED_FAIL,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.USER_LOADED_FAIL,
    });
  }
};

export const loginCall = (userCredential) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_START });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: actionTypes.LOGIN_FAIL, payload: err });
  }
};

export const logoutCall = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOG_OUT });
};
