import {
  DELETE_SUCCESS,
  GET_PERMISSIONS_SUCCESS,
  UPDATE_PERMISSIONS_SUCCESS,
  SHARE_SUCCESS,
  GET_HISTORY_SUCCESS,
  GET_RECORD_SUCCESS,
  REQUEST_SUCCESS,
  SEARCH_SUCCESS,
  VIEW_SUCCESS,
  CANCEL_REQUEST_SUCCESS,
  MEDHIS_INSERTED_SUCCESS,
  FIRST_HISTORY_SUCCESS,
  RECORD_INSERTED_SUCCESS,
  GET_ALL_RECORD_SUCCESS,
  ACCEPT_REQUEST_SUCCESS
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//Insert record of patient
export const insertRecord = (record, viewId, shareToken) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // If token, add to headers
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }

  const {
    bloodPressure,
    pulseRate,
    respiratoryRate,
    temperature,
    heent,
    heart,
    lungs,
    abdomen,
    extremities,
    completeBloodCount,
    urinalysis,
    fecalysis,
    chestXray,
    isihiraTest,
    audio,
    psychologicalExam,
    drugTest,
    hepatitisBTest,
    complaints,
    diagnosis,
    treatment,
    remarks
  } = record;
  const body = {
    bloodPressure,
    pulseRate,
    respiratoryRate,
    temperature,
    heent,
    heart,
    lungs,
    abdomen,
    extremities,
    completeBloodCount,
    urinalysis,
    fecalysis,
    chestXray,
    isihiraTest,
    audio,
    psychologicalExam,
    drugTest,
    hepatitisBTest,
    complaints,
    diagnosis,
    treatment,
    remarks
  };

  axios
    .post(`/api/clinician/addRecord/${viewId}`, body, config)
    .then((res) =>
      dispatch({
        type: RECORD_INSERTED_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "RECORD_INSERTED_FAIL"
        )
      )
    );
};

//Update history of patient
export const insertHistory = (history, viewId, shareToken) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }

  const {
    pastIllness,
    famIllness,
    immunization,
    hospitalizations,
    operations,
    allergies,
    medication,
    bloodType,
    height,
    weight,
    bodyArt,
    habits,
    visualAcuity,
    menarchYear,
    menarchAge,
    mensDuration,
    dysmennorrhea
  } = history;
  const body = {
    pastIllness,
    famIllness,
    immunization,
    hospitalizations,
    operations,
    allergies,
    medication,
    bloodType,
    height,
    weight,
    bodyArt,
    habits,
    visualAcuity,
    menarchYear,
    menarchAge,
    mensDuration,
    dysmennorrhea
  };
  axios
    .post(`/api/clinician/addHistory/${viewId}`, body, config)
    .then((res) =>
      dispatch({
        type: MEDHIS_INSERTED_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "MEDHIS_INSERTED_FAIL"
        )
      )
    );
};

//View patient medical record
export const view = (_id, shareToken) => (dispatch, getState) => {
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }

  axios
    .get(`/api/clinician/${_id}`, config)
    .then((res) =>
      dispatch({
        type: VIEW_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "VIEW_FAIL")
      );
    });
};

//Cancel request access to patient
export const cancelRequest = (_id) => (dispatch, getState) => {
  const body = {};
  axios
    .post(`/api/clinician/cancelRequest/${_id}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: CANCEL_REQUEST_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CANCEL_REQUEST_FAIL"
        )
      )
    );
};

//Request access to patient
export const request = ({ _id, reason, message, duration, isRequested }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({
    reason,
    message,
    duration,
    isRequested
  });
  console.log(body);

  axios
    .post(`/api/clinician/request/${_id}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: REQUEST_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "REQUEST_FAIL")
      )
    );
};

//Search for patients
export const search = (search) => (dispatch, getState) => {
  axios
    .get(`/api/clinician/search/${search}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SEARCH_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "SEARCH_FAIL")
      );
    });
};

//Get specific record for patient
export const getRecord = (record) => (dispatch, getState) => {
  axios
    .get(`/api/patient/getRecord/${record}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_RECORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_RECORD_FAIL")
      );
    });
};

//Get specific record for clinician
export const specificCRecord = (patient, record, shareToken) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // If token, add to headers
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }

  axios
    .get(`/api/clinician/specificRecord/${patient}/${record}`, config)
    .then((res) =>
      dispatch({
        type: GET_RECORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_RECORD_FAIL")
      );
    });
};

//Get all records of patient for clinician
export const allCRecords = (patient, shareToken) => (dispatch, getState) => {
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // If token, add to headers
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }
  axios
    .get(`/api/clinician/allRecords/${patient}`, config)
    .then((res) =>
      dispatch({
        type: GET_ALL_RECORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_ALL_RECORD_FAIL"
        )
      );
    });
};

//Get all records of patient
export const allRecords = () => (dispatch, getState) => {
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get(`/api/patient/allRecords`, config)
    .then((res) =>
      dispatch({
        type: GET_ALL_RECORD_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_ALL_RECORD_FAIL"
        )
      );
    });
};

//Get specific history for patient
export const getHistory = (id) => (dispatch, getState) => {
  axios
    .get(`/api/patient/specificHistory/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_HISTORY_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_HISTORY_FAIL")
      );
    });
};

//Get medical history for clinician
export const getCHistory = (patient, medHis, shareToken) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // If token, add to headers
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }

  axios
    .get(`/api/clinician/specificHistory/${patient}/${medHis}`, config)
    .then((res) =>
      dispatch({
        type: GET_HISTORY_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_HISTORY_FAIL")
      );
    });
};

//Get the first medical history of patient
export const firstHistory = (patient, medHisId, shareToken) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // If token, add to headers
  if (shareToken) {
    config.headers["x-auth-token1"] = shareToken;
  }

  axios
    .get(`/api/clinician/firstHistory/${patient}/${medHisId}`, config)
    .then((res) =>
      dispatch({
        type: FIRST_HISTORY_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "FIRST_HISTORY_FAIL"
        )
      );
    });
};

//Share patient record to clinician
export const share = ({ email, expiration, canPrint, canInsert }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({
    email,
    expiration,
    canPrint,
    canInsert
  });

  axios
    .post("/api/patient/share", body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SHARE_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "SHARE_FAIL")
      )
    );
};

//Get all permissions for patient
export const getPermissions = () => (dispatch, getState) => {
  localStorage.removeItem("permissions");
  axios
    .get("/api/patient/permissions", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_PERMISSIONS_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PERMISSIONS_FAIL"
        )
      );
    });
};

//Get all permissions for clinician
export const getPermissionsC = () => (dispatch, getState) => {
  localStorage.removeItem("permissions");
  axios
    .get("/api/clinician/permissions", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_PERMISSIONS_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PERMISSIONS_FAIL"
        )
      );
    });
};

//Update permission of clinician
export const updatePermission = (id, { canView, canPrint, canInsert }) => (
  dispatch,
  getState
) => {
  const body = { canView, canPrint, canInsert };
  axios
    .post(`/api/patient/update/permissions/${id}`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_PERMISSIONS_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PERMISSION_FAIL"
        )
      )
    );
};

//Cancel the request of clinician
export const cancel = (clinicianId, id) => (dispatch, getState) => {
  const body = {};
  axios
    .post(
      `/api/patient/cancelRequest/${clinicianId}/${id}`,
      body,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: CANCEL_REQUEST_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CANCEL_REQUEST_FAIL"
        )
      )
    );
};

//Accept the request of clinician
export const accept = (clinicianId, duration, id) => (dispatch, getState) => {
  const body = {};

  axios
    .post(
      `/api/patient/accept/${clinicianId}/${duration}/${id}`,
      body,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: ACCEPT_REQUEST_SUCCESS,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ACCEPT_REQUEST_FAIL"
        )
      );
    });
};

export const deleteRecords = (record) => (dispatch, getState) => {
  dispatch({
    type: DELETE_SUCCESS
  });
};
