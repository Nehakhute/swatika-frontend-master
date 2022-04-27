import { Col, DatePicker, Row, Select } from "antd";
import React from "react";
import "./ProfitLossReport.scss";

const { Option } = Select;

function ProfitLossReport(props) {
  return (
    <div className="profit-loss-report-wrap">
      <Row gutter={16} align="bottom">
        <Col span={6}>
          <div className="single-field">
            <span className="field-label">From Date</span>
            <DatePicker
              size="large"
              className="date-select"
              placeholder="dd-mm-yy"
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="single-field">
            <span className="field-label">To Date</span>
            <DatePicker
              size="large"
              className="date-select"
              placeholder="dd-mm-yy"
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="single-field">
            <span className="field-label">Trading Type</span>
            <Select size="large" placeholder="Trading Type">
              <Option value="BANKNIFTY OPTION">BANKNIFTY OPTION</Option>
              <Option value="NIFTY OPTION">NIFTY OPTION</Option>
            </Select>
          </div>
        </Col>
        <Col span={6}>
          <div className="download-btn">
            <span>DOWNLOAD</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProfitLossReport;
