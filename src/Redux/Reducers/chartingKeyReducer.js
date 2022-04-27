import * as actionTypes from "../Actions/ActionTypes";

const initState = {
  chartingKeyData: null,
  loadingGetChartingKeyData: false,
  loadingGenerateChartingKey: false,
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHARTING_KEY_DATA_INIT:
      return {
        ...state,
        loadingGetChartingKeyData: true,
      };
    case actionTypes.GET_CHARTING_KEY_DATA_SUCCESS:
      return {
        ...state,
        loadingGetChartingKeyData: false,
        chartingKeyData: action.payload,
      };
    case actionTypes.GET_CHARTING_KEY_DATA_FAIL:
      return {
        ...state,
        loadingGetChartingKeyData: false,
      };
    case actionTypes.GENERATE_CHARTING_KEY_INIT:
      return {
        ...state,
        loadingGenerateChartingKey: true,
      };
    case actionTypes.GENERATE_CHARTING_KEY_SUCCESS:
      return {
        ...state,
        loadingGenerateChartingKey: false,
        chartingKeyData: {
          ...state?.chartingKeyData,
          ...(action?.payload?.apikey && { api_key: action?.payload?.apikey }),
        },
      };
    case actionTypes.GENERATE_CHARTING_KEY_FAIL:
      return {
        ...state,
        loadingGenerateChartingKey: false,
      };
    case actionTypes.UPDATE_CHARTING_KEY_STATUS_INIT:
      return {
        ...state,
      };
    case actionTypes.UPDATE_CHARTING_KEY_STATUS_SUCCESS:
      return {
        ...state,
        chartingKeyData: action?.payload,
      };
    case actionTypes.UPDATE_CHARTING_KEY_STATUS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default store;
