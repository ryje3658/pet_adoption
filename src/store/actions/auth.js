import {
  AUTH_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTH_LOGOUT
} from "./actionTypes";
import axios from "axios";

const SERVER_URL = `http://jensenry.pythonanywhere.com`

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

// After success login, return token from Django
export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token: token,
  };
};

export const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    error: error,
  };
};

// After success signup, return token from Django
export const signupSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token: token,
  };
};

export const signupFail = (error) => {
  return {
    type: SIGNUP_FAIL,
    error: error,
  };
};

// Logout to remove token from cookie
export const authLogout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_LOGOUT,
  };
};

// Set timeout after login to automtic logout
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

// Login require username and password
// using axios to post data to the database
export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${SERVER_URL}/api/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        localStorage.setItem("token", token);
        dispatch(loginSuccess(token));
        //redirect to homepage
        window.location.replace("/");
        //automatic logout after 1 hr
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(loginFail(err));
        window.location.href = "/login";
      });
  };
};

// Signup with passing parameraters to Django
// receive and save token after success, then redirect to homepage
// if signup fail, redirect to the same page.
export const authSignup = (username, email, password, confirm_password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${SERVER_URL}/api/register/`, {
        username: username,
        email: email,
        password: password,
        confirm_password: confirm_password,
      })
      .then((res) => {
        const token = res.data.key;
        localStorage.setItem("token", token);
        dispatch(signupSuccess(token));
        window.location.replace("/");
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(signupFail(err));
        window.location.replace("/register");
      });
  };
};

// Signup with passing parameraters to Django
// receive and save token after success, then redirect to homepage
// if signup fail, redirect to the same page.
export const authSignupShelter = (username, email, password, confirm_password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${SERVER_URL}/api/registershelter/`, {
        username: username,
        email: email,
        password: password,
        confirm_password: confirm_password,
      })
      .then((res) => {
        const token = res.data.key;
        localStorage.setItem("token", token);
        dispatch(signupSuccess(token));
        window.location.replace("/");
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(signupFail(err));
        window.location.replace("/registershelter");
      });
  };
};

// this function help when when user close and open the browser, it will keep the user login.
// check wether the browser have the token, will dispatch some action
// Token not found, dispatch action, redirect page to login page
// if found tokem in the cookies, automatic login using token. reset the timeout
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(authLogout());
      window.location.replace("/login");
    } else {
      dispatch(loginSuccess(token));
      dispatch(checkAuthTimeout(3600));
    }
  };
};
