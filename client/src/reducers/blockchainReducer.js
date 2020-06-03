import {
  UPDATE_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_SUCCESS,
  GET_HISTORY_SUCCESS,
  GET_RECORD_SUCCESS,
  DELETE_SUCCESS,
  SHARE_SUCCESS,
  REQUEST_SUCCESS,
  SEARCH_SUCCESS,
  VIEW_SUCCESS,
  CANCEL_REQUEST_SUCCESS,
  MEDHIS_INSERTED_SUCCESS,
  FIRST_HISTORY_SUCCESS,
  RECORD_INSERTED_SUCCESS,
  GET_ALL_RECORD_SUCCESS,
  ACCEPT_REQUEST_SUCCESS
} from "../actions/types";

const initialState = {
  msg: null,
  shareToken: localStorage.getItem("shareToken"),
  search: [],
  medHis: JSON.parse(localStorage.getItem("medHis")),
  viewId: localStorage.getItem("viewId"),
  view: JSON.parse(localStorage.getItem("view")),
  records: [],
  history: JSON.parse(localStorage.getItem("history")),
  record: null,
  permissions: JSON.parse(localStorage.getItem("permissions")),
  medHisId: localStorage.getItem("medHisId")
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERMISSIONS_SUCCESS:
      localStorage.setItem(
        "permissions",
        JSON.stringify(action.payload.permissions)
      );
      return {
        ...state,
        ...action.payload
      };
    case VIEW_SUCCESS:
      localStorage.setItem("view", JSON.stringify(action.payload.view));
      localStorage.setItem("medHisId", action.payload.medHisId);
      localStorage.setItem("viewId", action.payload.view._id);
      localStorage.setItem(
        "shareToken",
        state.permissions[
          state.permissions.findIndex(
            (per) => per.patientId === action.payload.view._id
          )
        ].shareToken
      );
      return {
        ...state,
        ...action.payload
      };
    case SEARCH_SUCCESS:
      localStorage.removeItem("history");
      return {
        ...state,
        ...action.payload
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        records: []
      };
    case FIRST_HISTORY_SUCCESS:
      localStorage.setItem("history", JSON.stringify(action.payload.history));
      return {
        ...state,
        ...action.payload
      };
    case GET_HISTORY_SUCCESS:
      localStorage.setItem("medHis", JSON.stringify(action.payload.medHis));
      return {
        ...state,
        ...action.payload
      };
    case MEDHIS_INSERTED_SUCCESS:
      localStorage.setItem("medHisId", action.payload.medHisId);
      return {
        ...state,
        ...action.payload
      };
    case ACCEPT_REQUEST_SUCCESS:
    case GET_RECORD_SUCCESS:
    case SHARE_SUCCESS:
    case RECORD_INSERTED_SUCCESS:
    case UPDATE_PERMISSIONS_SUCCESS:
    case REQUEST_SUCCESS:
    case CANCEL_REQUEST_SUCCESS:
    case GET_ALL_RECORD_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
