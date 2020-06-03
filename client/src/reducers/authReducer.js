import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  FIRST_STEP_SUCCESS,
  MATCH_CODE_SUCCESS,
  UPLOAD_REGISTER_SUCCESS,
  SETUP_SUCCESS,
  EDIT_INFO_SUCCESS,
  UPLOAD_ICON_SUCCESS,
  EMAIL_SENT_SUCCESS,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  CHANGE_PLAN_SUCCESS,
  SELECT_OCCUPATION_SUCCESS
} from "../actions/types";

const initialState = {
  msg: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  patient: null,
  clinician: null,
  code: JSON.parse(localStorage.getItem("code")),
  register: JSON.parse(localStorage.getItem("register")),
  firstStep: JSON.parse(localStorage.getItem("firstStep")),
  occupation: JSON.parse(localStorage.getItem("occupation"))
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_PLAN_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_EMAIL_SUCCESS:
    case EMAIL_SENT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
      localStorage.removeItem("viewId");
      localStorage.removeItem("permission");
      localStorage.removeItem("history");
      localStorage.removeItem("shareToken");
      localStorage.removeItem("medHis");
      localStorage.removeItem("view");
      localStorage.removeItem("code");
      localStorage.removeItem("firstStep");
      localStorage.removeItem("occupation");
      localStorage.removeItem("medHisId");
      return {
        ...state,
        ...action.payload,
        token: null,
        patient: null,
        clinician: null,
        isAuthenticated: false,
        isLoading: false
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case SELECT_OCCUPATION_SUCCESS:
      localStorage.setItem(
        "occupation",
        JSON.stringify(action.payload.occupation)
      );
      return {
        ...state,
        msg: action.payload.msg
      };
    case MATCH_CODE_SUCCESS:
    case UPLOAD_ICON_SUCCESS:
    case EDIT_INFO_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg
      };
    case SETUP_SUCCESS:
      localStorage.removeItem("firstStep");
      return {
        ...state,
        msg: action.payload.msg
      };
    case FIRST_STEP_SUCCESS:
      localStorage.setItem("code", JSON.stringify(action.payload.code));
      localStorage.setItem("firstStep", JSON.stringify(action.payload.patient));
      return {
        ...state,
        msg: action.payload.msg
      };
    case UPLOAD_REGISTER_SUCCESS:
      localStorage.removeItem("occupation");
      localStorage.removeItem("code");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        msg: action.payload.msg,
        patient: action.payload.patient
      };
    //END
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
        register: null
      };

    case AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("viewId");
      localStorage.removeItem("permission");
      localStorage.removeItem("permissions");
      localStorage.removeItem("history");
      localStorage.removeItem("shareToken");
      localStorage.removeItem("medHis");
      localStorage.removeItem("view");
      return {
        ...state,
        token: null,
        patient: null,
        clinician: null,
        isAuthenticated: false,
        isLoading: false,
        msg: action.payload
      };

    default:
      return state;
  }
}
