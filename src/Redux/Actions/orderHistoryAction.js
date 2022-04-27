import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getOrderHistory = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ORDER_HISTORY_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/order/get`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_ORDER_HISTORY_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_ORDER_HISTORY_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_ORDER_HISTORY_FAIL,
        });
      });
  };
};
