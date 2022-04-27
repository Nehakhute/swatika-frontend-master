import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const brokerLogin = (data, onSuccess) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.BROKER_LOGIN_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/broker/login`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.BROKER_LOGIN_SUCCESS,
            payload: res.data,
          });
          onSuccess();
        } else {
          dispatch({
            type: actionTypes.BROKER_LOGIN_FAIL,
            payload: res.data?.message || "Failed to login",
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.BROKER_LOGIN_FAIL,
          payload: typeof e == "string" ? e : "Failed to login",
        });
      });
  };
};

export const getBrokerLoginStatus = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_BROKER_LOGIN_STATUS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/customer/getById`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_BROKER_LOGIN_STATUS_SUCCESS,
            payload: Boolean(res.data?.data?.brokerLogin),
          });
        } else {
          dispatch({
            type: actionTypes.GET_BROKER_LOGIN_STATUS_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_BROKER_LOGIN_STATUS_FAIL,
        });
      });
  };
};
