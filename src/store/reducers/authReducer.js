import * as actionTypes from "../actions/authActionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
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
        user: null,
        isFetching: true,
        error: false,
      };

    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        isFetching: false,
        error: false,
      };

    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
      // localStorage.removeItem("user");
      return {
        ...state,
        error: payload,
        isFetching: false,
      };
    case actionTypes.LOG_OUT:
      localStorage.clear();
      return {
        ...state,
        isFetching: false,
        error: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
