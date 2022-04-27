import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getStrategicsData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_STRATEGICS_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/strategic/performance/search`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_STRATEGICS_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_STRATEGICS_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_STRATEGICS_DATA_FAIL,
        });
      });
  };
};
