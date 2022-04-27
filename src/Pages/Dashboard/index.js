import { Tabs } from "antd";
import React from "react";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import DayTrading from "./components/DayTrading/DayTrading";
import OpenPosition from "./components/OpenPosition/OpenPosition";
import PositionTrading from "./components/PositionTrading/PositionTrading";
import "./index.scss";
const { TabPane } = Tabs;

function Dashboard(props) {
  return (
    <div className="dashboard-main-wrapper">
      <div className="dashboard-tabs-wrap">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Day Trading" key="1">
            <DayTrading />
          </TabPane>
          {/* <TabPane tab="Positional Trading" key="2">
            <PositionTrading />
          </TabPane> */}
          <TabPane tab="Paper Trading" key="3">
            <DayTrading />
          </TabPane>
          <TabPane tab="Open Position" key="4">
            <OpenPosition />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
