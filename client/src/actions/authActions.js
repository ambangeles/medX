import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CHANGE_PLAN_SUCCESS,
  FIRST_STEP_SUCCESS,
  MATCH_CODE_SUCCESS,
  UPLOAD_REGISTER_SUCCESS,
  SETUP_SUCCESS,
  EDIT_INFO_SUCCESS,
  UPLOAD_ICON_SUCCESS,
  EMAIL_SENT_SUCCESS,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  SELECT_OCCUPATION_SUCCESS
} from "./types";

//Edit clinician information
export const editInfoC = ({
  firstName,
  middleName,
  lastName,
  birthMonth,
  birthDay,
  birthYear,
  sex,
  contactNumber
}) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    sex,
    contactNumber
  });

  axios
    .post("/api/clinician/editInfoC", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_INFO_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_INFO_FAIL")
      );
    });
};

//Select occupation of clinician
export const selectOccupation = ({ occupation }) => (dispatch, getState) => {
  // Request body
  const body = { occupation };

  axios
    .post(`/api/clinician/selectOccupation`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SELECT_OCCUPATION_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "SELECT_OCCUPATION_FAIL"
        )
      );
    });
};

//END FOR CLINICIAN

//Change the plan of patient
export const changePlan = (plan) => (dispatch, getState) => {
  // Request body
  const body = { plan };

  axios
    .post(`/api/patient/changePlan`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: CHANGE_PLAN_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "CHANGE_PLAN")
      );
    });
};

//Update password for patient
export const updatePassword = ({
  currentPassword,
  newPassword,
  confirmPassword
}) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({
    currentPassword,
    newPassword,
    confirmPassword
  });

  axios
    .post("/api/patient/update/password", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PASSWORD_FAIL"
        )
      );
    });
};

//update password Clinician
export const updatePasswordC = ({
  currentPassword,
  newPassword,
  confirmPassword
}) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({
    currentPassword,
    newPassword,
    confirmPassword
  });

  axios
    .post("/api/clinician/update/password", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PASSWORD_FAIL"
        )
      );
    });
};

//Update email address of patient
export const updateEmail = ({ email, code, inputCode }) => (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({ email, code, inputCode });

  axios
    .post("/api/patient/update/email", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_EMAIL_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_EMAIL_FAIL"
        )
      );
    });
};

//Update email address of clinician
export const updateEmailC = ({ email, code, inputCode }) => (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({ email, code, inputCode });

  axios
    .post("/api/clinician/update/email", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_EMAIL_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_EMAIL_FAIL"
        )
      );
    });
};

//Send code to the given email address
export const sendEmail = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email });
  axios
    .post(`/api/sendEmail`, body, config)
    .then((res) =>
      dispatch({
        type: EMAIL_SENT_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EMAIL_SENT_FAIL")
      );
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Upload icon
export const uploadIcon = (formData, email, icon) => (dispatch, getState) => {
  axios
    .post(`/api/uploadIcon/${email}/${icon}`, formData, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPLOAD_ICON_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "UPLOAD_ICON_FAIL")
      );
    });
};

export const deleteIcon = (filename) => (dispatch, getState) => {
  axios
    .delete(`/api/deleteIcon/${filename}`, tokenConfig(getState))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "DELETE_FAILED")
      );
    });
};

//Edit patient information
export const editInfo = ({
  address,
  religion,
  civilStatus,
  nationality,
  contactNumber,
  guardianName,
  relationship,
  guardianContactNo
}) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({
    address,
    religion,
    civilStatus,
    nationality,
    contactNumber,
    guardianName,
    relationship,
    guardianContactNo
  });

  axios
    .post("/api/patient/editInfo", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_INFO_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_INFO_FAIL")
      );
    });
};

//Setup other information of patient
export const setup = ({
  address,
  religion,
  civilStatus,
  nationality,
  contactNumber,
  guardianName,
  relationship,
  guardianContactNo
}) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({
    address,
    religion,
    civilStatus,
    nationality,
    contactNumber,
    guardianName,
    relationship,
    guardianContactNo
  });

  axios
    .post("/api/patient/setup", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SETUP_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "SETUP_FAIL")
      );
    });
};

//First step of registration for user
export const firstStep = ({
  firstName,
  middleName,
  lastName,
  birthMonth,
  birthDay,
  birthYear,
  sex,
  email,
  password,
  confirmPassword
}) => (dispatch, getState) => {
  const body = JSON.stringify({
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    sex,
    email,
    password,
    confirmPassword
  });

  axios
    .post("/api/firstStep", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: FIRST_STEP_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "FIRST_STEP_FAIL")
      );
    });
};

//match Code
export const matchCode = (code, inputCode) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { inputCode, code };
  axios
    .post(`/api/match`, body, config)
    .then((res) =>
      dispatch({
        type: MATCH_CODE_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "MATCH_CODE_FAIL")
      );
    });
};

//Upload validation and register patient
export const uploadRegister = (
  formData,
  {
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password
  }
) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const data = JSON.stringify({
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password
  });
  axios
    .post(`/api/uploadRegister/${data}`, formData, config)
    .then((res) =>
      dispatch({
        type: UPLOAD_REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPLOAD_REGISTER_FAIL"
        )
      );
    });
};

//Upload validation and register clinician
export const uploadRegisterC = (
  formData,
  {
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password
  },
  occupation
) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const data = JSON.stringify({
    firstName,
    middleName,
    lastName,
    birthMonth,
    birthDay,
    birthYear,
    age,
    sex,
    email,
    password,
    occupation
  });
  axios
    .post(`/api/uploadRegisterC/${data}`, formData, config)
    .then((res) =>
      dispatch({
        type: UPLOAD_REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPLOAD_REGISTER_FAIL"
        )
      );
    });
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/userInfo", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const getNotiC = (_id) => (dispatch, getState) => {
  axios
    .get(`/api/clinician/notification/${_id}`, tokenConfig(getState))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "NOTI_FAIL")
      );
    });
};

//Send Email
export const sendLink = (email) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({
    email
  });
  console.log(body);
  axios
    .post(`/api/sendLink`, body, config)
    .then((res) =>
      dispatch({
        type: EMAIL_SENT_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EMAIL_SENT_FAIL")
      );
    });
};
//END

//update password
export const forgotPass = ({ newPassword, confirmPassword }, resetToken) => (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (resetToken) {
    config.headers["x-auth-link"] = resetToken;
  }
  // Request body
  const body = JSON.stringify({
    newPassword,
    confirmPassword
  });

  axios
    .post(`/api/reset`, body, config)
    .then((res) =>
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PASSWORD_FAIL"
        )
      );
    });
};

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
