import React, { useEffect, useState } from "react";
import { Col, Divider, Input, message, Row, Select, Switch } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import "./ChartingApiKey.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  generateChartingKey,
  getChartingKeyData,
  updateChartingKeyStatus,
} from "../../Redux/Actions/chartingKeyActions";

const { Option } = Select;

function ChartingApiKey(props) {
  const [chartingKey, setChartingKey] = useState();
  const chartingKeyData = useSelector(
    (state) => state?.ChartingKey?.chartingKeyData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChartingKeyData());
  }, []);

  useEffect(() => {
    setChartingKey(chartingKeyData);
  }, [chartingKeyData]);

  const onGenerateChartingKey = () => {
    dispatch(
      generateChartingKey(
        () => {
          message.success("Charting key created successfully..");
        },
        () => {
          message.error("Failed to create charting key...");
        }
      )
    );
  };

  const onUpdateKeyStatus = (value) => {
    dispatch(
      updateChartingKeyStatus(
        { id: chartingKey?.id, status: value ? 1 : 0 },
        () => {
          message.success("Status updated successfully..");
        },
        () => {
          message.error("Failed to update status...");
        }
      )
    );
  };

  return (
    <div className="charting-api-key-main">
      <Row>
        <Col span={18}>
          <div className="generate-key-box">
            <span className="box-title">Generate API Key</span>
            <div className="key-content">
              <Input
                disabled={chartingKey?.api_key ? true : false}
                className="key-input"
                value={chartingKey?.api_key}
                placeholder="X-API-KEY=abcdef12345"
              />
              <div
                onClick={() => !chartingKey?.api_key && onGenerateChartingKey()}
                className={`generate-btn ${
                  chartingKey?.api_key && "disable-btn"
                }`}
              >
                <span>Generate KEY</span>
              </div>
              <CopyToClipboard
                text={chartingKey?.api_key}
                onCopy={() =>
                  chartingKey?.api_key && message.success("Copied..")
                }
              >
                <div className="copy-btn">
                  <span>copy</span>
                </div>
              </CopyToClipboard>
              {chartingKey?.api_key && (
                <div className="active-status-switch">
                  <label>Status</label>
                  <Switch
                    checked={chartingKey?.status}
                    onChange={(checked) => onUpdateKeyStatus(checked)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="copy-trade-box">
            <span className="box-title">Copy Trade</span>
            <Row gutter={60} className="content-single-row">
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Enter API Key</span>
                  <Input
                    className="input-number"
                    placeholder="X-API-KEY=abcdef12345"
                    size="large"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Enter Quantity</span>
                  <Input
                    className="input-number"
                    placeholder="20"
                    size="large"
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={60} className="content-single-row">
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Exchange</span>
                  <Select placeholder="select exchange" defaultValue={"NFO"}>
                    <Option value={"NSE"}>NSE</Option>
                    <Option value={"NFO"}>NFO</Option>
                    <Option value={"CDS"}>CDS</Option>
                    <Option value={"MCX"}>MCX</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Order Type</span>
                  <Select placeholder="select order type" defaultValue={"MIS"}>
                    <Option value={"MIS"}>MIS</Option>
                    <Option value={"NRML"}>NRML</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            <Row gutter={60} className="content-single-row">
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Enter Symbol Name</span>
                  <Input
                    className="input-number"
                    placeholder="Symbol Name"
                    size="large"
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="single-field">
                  <span className="label">Trading Type</span>
                  <Select defaultValue={"BANK NIFTY NFO"}>
                    <Option value={"NIFTY NFO"}>BANK NIFTY NFO</Option>
                    <Option value={"BANK NIFTY NFO"}>BANK NIFTY NFO</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            <div className="action-btn-wrap">
              <div className="buy-btn">
                <span>buy</span>
              </div>
              <div className="sell-btn">
                <span>sell</span>
              </div>
              <div className="cancel-btn">
                <span>cancel</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChartingApiKey;
