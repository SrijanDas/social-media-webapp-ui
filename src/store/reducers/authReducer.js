import * as actionTypes from "../actions/authActionTypes";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  isFetching: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case actionTypes.USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case actionTypes.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      const access = payload.accessToken;
      const refresh = payload.refreshToken;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: access,
        refresh: refresh,
        isFetching: false,
        error: false,
      };

    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOG_OUT:
      localStorage.clear();
      return {
        ...state,
        error: payload,
        isFetching: false,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
