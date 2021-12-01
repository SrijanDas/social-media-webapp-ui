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
      const user = res.data;
      dispatch({
        type: actionTypes.USER_LOADED_SUCCESS,
        payload: user,
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
  await axios
    .post("/auth/login", userCredential)
    .then((res) => {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
      dispatch(load_user());
    })
    .catch((err) => {
      dispatch({ type: actionTypes.LOGIN_FAIL, payload: err.response.data });
      console.log(err.response.data);
    });
};

export const checkAuthenticated = () => async (dispatch) => {
  const token = localStorage.getItem("refresh");
  if (token !== null) {
    dispatch({ type: actionTypes.AUTH_START });
    try {
      const res = await axios.post("/auth/jwt/verify", {
        refreshToken: token,
      });

      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data.accessToken,
      });
      dispatch(load_user());
    } catch (error) {
      dispatch({ type: actionTypes.AUTH_FAIL });
    }
  } else {
    dispatch({ type: actionTypes.AUTH_FAIL });
  }
};

export const logoutCall = (token) => async (dispatch) => {
  try {
    await axios.post("/auth/logout/", { token });
    dispatch({ type: actionTypes.LOG_OUT });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.LOG_OUT });
  }
};
