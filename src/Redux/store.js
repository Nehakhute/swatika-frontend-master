import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./Reducers/AuthReducer";
import BrokerLoginReducer from "./Reducers/BrokerLoginReducer";
import PositionsReducer from "./Reducers/positionsReducer";
import DayTradingReducer from "./Reducers/dayTradingReducer";
import OrderHistoryReducer from "./Reducers/orderHistoryReducer";
import SignalScannerReducer from "./Reducers/signalScannerReducer";
import StrategicReducer from "./Reducers/strategicReducer";
import SettingReducer from "./Reducers/settingReducer";
import chartingKeyReducer from "./Reducers/chartingKeyReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  BrokerLogin: BrokerLoginReducer,
  Positions: PositionsReducer,
  DayTrading: DayTradingReducer,
  OrderHistory: OrderHistoryReducer,
  SignalScanner: SignalScannerReducer,
  Strategic: StrategicReducer,
  Setting: SettingReducer,
  ChartingKey: chartingKeyReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
