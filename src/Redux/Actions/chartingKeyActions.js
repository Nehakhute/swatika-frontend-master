import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getChartingKeyData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_CHARTING_KEY_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/apikey`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_CHARTING_KEY_DATA_SUCCESS,
            payload: res.data?.apikey,
          });
        } else {
          dispatch({
            type: actionTypes.GET_CHARTING_KEY_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_CHARTING_KEY_DATA_FAIL,
        });
      });
  };
};

export const generateChartingKey = (onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GENERATE_CHARTING_KEY_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/apikey`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GENERATE_CHARTING_KEY_SUCCESS,
            payload: res.data,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.GENERATE_CHARTING_KEY_FAIL,
          });
          onFail();
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GENERATE_CHARTING_KEY_FAIL,
        });
        onFail();
      });
  };
};

export const updateChartingKeyStatus = (body, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CHARTING_KEY_STATUS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(`${API_URL}/apikey/status`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.UPDATE_CHARTING_KEY_STATUS_SUCCESS,
            payload: res?.data?.apikey,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.UPDATE_CHARTING_KEY_STATUS_FAIL,
          });
          onFail();
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.UPDATE_CHARTING_KEY_STATUS_FAIL,
        });
        onFail();
      });
  };
};
