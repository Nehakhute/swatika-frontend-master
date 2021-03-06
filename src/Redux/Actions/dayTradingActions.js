import axios from "axios";
import { API_URL } from "../../config";
import { getTokenFromLocalStorage } from "../../helpers";
import * as actionTypes from "./ActionTypes";

export const getDayTradingsData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_DAY_TRADINGS_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/trading`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_DAY_TRADINGS_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_DAY_TRADINGS_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_DAY_TRADINGS_DATA_FAIL,
        });
      });
  };
};

export const getStrtegicOptionsData = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_STRETAGIC_OPTIONS_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .get(`${API_URL}/strategic`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.GET_STRETAGIC_OPTIONS_DATA_SUCCESS,
            payload: res.data?.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_STRETAGIC_OPTIONS_DATA_FAIL,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.GET_STRETAGIC_OPTIONS_DATA_FAIL,
        });
      });
  };
};

export const updateDayTradingAutoTradeStatus = (payload, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/customer/trading/status`,
        { ...payload },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_SUCCESS,
          });
          onSuccess(res?.data?.message);
        } else {
          dispatch({
            type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_FAIL,
          });
          onFail(res?.data?.message);
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.UPDATE_DAY_TRADING_AUTO_TRADE_STATUS_FAIL,
        });
        onFail(e?.message);
      });
  };
};

export const updateDayTradingCardData = (payload, onSuccess, onFail) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_DAY_TRADING_CARD_DATA_INIT,
    });
    const token = getTokenFromLocalStorage();
    axios
      .post(
        `${API_URL}/customer/trading`,
        { ...payload },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data?.success) {
          dispatch({
            type: actionTypes.UPDATE_DAY_TRADING_CARD_DATA_SUCCESS,
          });
          onSuccess(res?.data?.message);
        } else {
          dispatch({
            type: actionTypes.UPDATE_DAY_TRADING_CARD_DATA_FAIL,
          });
          onFail(res?.data?.message);
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.UPDATE_DAY_TRADING_CARD_DATA_FAIL,
        });
        onFail(e?.message);
      });
  };
};