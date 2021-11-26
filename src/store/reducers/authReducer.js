import * as actionTypes from "../actions/authActionTypes";
import * as followActionTypes from "../actions/followActionTypes";
import * as imgActionTypes from "../actions/imgActionTypes";

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
        isAuthenticated: true,
        isFetching: false,
      };

    case actionTypes.AUTH_FAIL:
    case actionTypes.USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isFetching: false,
      };

    case actionTypes.AUTH_START:
    case actionTypes.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case actionTypes.AUTH_SUCCESS:
      localStorage.setItem("access", payload);
      return {
        ...state,
        isAuthenticated: true,
        access: payload,
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
        error: false,
      };

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

    case followActionTypes.CONNECTION_REQUEST_ACCEPTED:
      return {
        ...state,
        user: {
          ...state.user,
          connections: [...state.user.connections, payload],
          connectRequests: state.user.connectRequests.filter(
            (userId) => userId !== payload
          ),
        },
      };

    case followActionTypes.DISCONNECTED_USER:
      return {
        ...state,
        user: {
          ...state.user,
          connections: state.user.connections.filter(
            (userId) => userId !== payload
          ),
        },
      };

    case imgActionTypes.PROFILE_PHOTO_LOADED_FAIL:
      return {
        ...state,
        error: payload,
      };

    case imgActionTypes.PROFILE_PHOTO_LOADED:
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: payload,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
