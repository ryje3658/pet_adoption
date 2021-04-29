import {
  AUTH_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTH_LOGOUT
  } from "../actions/actionTypes";

// set initial state
const initialState = {
  loading: false,
  error: null,
  token: null,
};

export const updateObject = (oldObject, updatedProps) => {
    return {
      ...oldObject,
      ...updatedProps,
    };
};

export const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

export const loginSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    error: null,
  });
};

export const loginFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

export const signupSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    error: null,
  });
};

export const signupFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

export const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOGIN_FAIL:
      return loginFail(state, action);
    case SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case SIGNUP_FAIL:
      return signupFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
