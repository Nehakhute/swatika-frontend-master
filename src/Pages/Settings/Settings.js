import { Col, Row } from "antd";
import React, { useState } from "react";
import AutoLogin from "./components/AutoLogin/AutoLogin";
import Downloads from "./components/Downloads/Downloads";
import IntradayStockList from "./components/IntradayStockList/IntradayStockList";
import ProfitLossReport from "./components/ProfitLossReport/ProfitLossReport";
import Subscription from "./components/Subscription/Subscription";
import "./Settings.scss";

function Settings(props) {
  const [activeKey, setActiveKey] = useState("auto-login");

  const renderActiveTabContent = () => {
    switch (activeKey) {
      case "auto-login":
        return <AutoLogin />;
      case "subscription":
        return <Subscription />;
      case "downloads":
        return <Downloads />;
      case "intraday-stock-list":
        return <IntradayStockList />;
      case "pl-report":
        return <ProfitLossReport />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-main-wrap">
      <Row gutter={2} className="setting-panel">
        <Col span={6}>
          <div className="setting-left-panel-wrap">
            <span className="setting-title">Settings</span>
            <div
              onClick={() => setActiveKey("auto-login")}
              className={`setting-side-item-wrap ${
                activeKey == "auto-login" && "active-item"
              }`}
            >
              <span className="item-title">Auto Login</span>
              <span className="item-desc">Some help text here</span>
            </div>
            <div
              onClick={() => setActiveKey("subscription")}
              className={`setting-side-item-wrap ${
                activeKey == "subscription" && "active-item"
              }`}
            >
              <span className="item-title">Subscription</span>
              <span className="item-desc">Some help text here</span>
            </div>
            <div
              onClick={() => setActiveKey("downloads")}
              className={`setting-side-item-wrap ${
                activeKey == "downloads" && "active-item"
              }`}
            >
              <span className="item-title">Downloads</span>
              <span className="item-desc">Some help text here</span>
            </div>
            <div
              onClick={() => setActiveKey("intraday-stock-list")}
              className={`setting-side-item-wrap ${
                activeKey == "intraday-stock-list" && "active-item"
              }`}
            >
              <span className="item-title">Intraday Stock List</span>
              <span className="item-desc">Some help text here</span>
            </div>
            <div
              onClick={() => setActiveKey("pl-report")}
              className={`setting-side-item-wrap ${
                activeKey == "pl-report" && "active-item"
              }`}
            >
              <span className="item-title">Profit & Loss Report</span>
              <span className="item-desc">Some help text here</span>
            </div>
          </div>
        </Col>
        <Col span={18}>
          <div className="setting-content-wrap">{renderActiveTabContent()}</div>
        </Col>
      </Row>
    </div>
  );
}

export default Settings;
