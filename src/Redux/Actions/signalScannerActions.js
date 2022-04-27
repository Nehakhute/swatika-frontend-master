import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getPositionalSignalscannerData = (queryPayload) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/scanner`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...queryPayload },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_POSITIONAL_SIGNAL_SCANNER_DATA_FAIL,
        });
      });
  };
};
