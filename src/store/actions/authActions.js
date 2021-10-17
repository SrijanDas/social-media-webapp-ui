import axios from "../../axios";
import * as actionTypes from "./authActionTypes";

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get("/auth/users/me", config);
      dispatch({
        type: actionTypes.USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOADED_FAIL,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: actionTypes.USER_LOADED_FAIL,
    });
    console.log("Token not found");
  }
};

export const loginCall = (userCredential) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_START });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
    dispatch(load_user());
  } catch (err) {
    dispatch({ type: actionTypes.LOGIN_FAIL, payload: err });
  }
};

export const logoutCall = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOG_OUT });
};
