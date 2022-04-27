import {
  Button,
  Col,
  Divider,
  Input,
  message,
  Row,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../../../hooks/useSocket";

import {
  getDayTradingsData,
  getStrtegicOptionsData,
  updateDayTradingAutoTradeStatus,
  updateDayTradingCardData,
  getProfitAndLossData,
} from "../../../../Redux/Actions/dayTradingActions";
import "./DayTrading.scss";
import Modal from "./Modal";
import SquareModal from "./SquareModal";

const { Option } = Select;

const initialData = [
  {
    label: "BANKNIFTY NFO",
    tradeType: "bankniftynfo",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 90k capital required.",
    p_and_l: 100.0,
  },
  {
    label: "NIFTY NFO",
    tradeType: "niftynfo",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 80k capital required.",
  },
  {
    label: "BANKNIFTY OPTION",
    tradeType: "bankniftyoption",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 25k capital required.",
  },
  {
    label: "NIFTY OPTION",
    tradeType: "niftyoption",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 25k capital required.",
  },
  {
    label: "BANKNIFTY OPTION SELLING",
    tradeType: "bankniftyoptionselling",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 50k capital required with hedging.",
  },
  {
    label: "NIFTY OPTION SELLING",
    tradeType: "niftyoptionselling",
    tradeStatus: 0,
    segment: "NFO",
    exchange: "NFO",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    note: "For 1 Lot 50k capital required with hedging.",
  },
  {
    label: "MCX NFO",
    tradeType: "mcxnfo",
    tradeStatus: 0,
    segment: "MCX",
    exchange: "MCX",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    count_of_stock: 0,
    show_count_of_stock: true,
    note: "For 1 Lot one symbol 2 Lacs capital required.",
  },
  {
    label: "NSE-CURRENCY",
    tradeType: "nsecurrency",
    tradeStatus: 0,
    segment: "CDS",
    exchange: "CDS",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    count_of_stock: 0,
    show_count_of_stock: true,
    note: "For 1 Lot one symbol 10k capital required.",
  },
  {
    label: "NSE CASH",
    tradeType: "nsecash",
    tradeStatus: 0,
    segment: "NSE",
    exchange: "NSE",
    qty: null,
    loss_limit: null,
    profit_limit: null,
    strategic_name: undefined,
    tradingType: 1,
    count_of_stock: 0,
    show_count_of_stock: true,
    note: "For 5 qty 5 stock 15k capital required.",
  },
  // {
  //   label: "STOCK NFO",
  //   tradeType: "stocknfo",
  //   tradeStatus: 0,
  //   segment: "NFO",
  //   exchange: "NFO",
  //   qty: null,
  //   loss_limit: null,
  //   profit_limit: null,
  //   strategic_name: undefined,
  //   tradingType: 1,
  //   count_of_stock: 0,
  //   show_count_of_stock: true,
  //   note: "For 1 Lot one symbol 1.8 Lacs capital required.",
  // },
];

function DayTrading(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSquareModal, setIsSquareModal] = useState(false);

  const [dayTradingCardData, setDayTradingCardsData] = useState(initialData);
  const [dayTradingData_p_and_l, setDayTradingData_p_and_l] = useState({});
  const dayTradingData = useSelector(
    (state) => state?.DayTrading?.dayTradingData
  );
  const strategicOptionsData = useSelector(
    (state) => state?.DayTrading?.strategicOptions
  );
  const dispatch = useDispatch();
  useSocket("GRUOP_WISE_POSITION", (data) => {
    setDayTradingData_p_and_l(data?.dayTrading || {});
  });

  useEffect(() => {
    dispatch(getDayTradingsData());
    dispatch(getStrtegicOptionsData());
  }, []);

  useEffect(() => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        const matchedCardData = dayTradingData?.find(
          (dataItem) => dataItem?.trade_type == item?.tradeType
        );
        if (matchedCardData) {
          return {
            ...item,
            tradeStatus: matchedCardData?.trade_status,
            qty: matchedCardData?.qty,
            loss_limit: matchedCardData?.loss_limit,
            profit_limit: matchedCardData?.profit_limit,
            strategic_name: matchedCardData?.strategic_name,
            ...(item?.show_count_of_stock && {
              count_of_stock: matchedCardData?.count_of_stock,
            }),
            p_and_l: matchedCardData?.p_and_l || "Error",
          };
        } else {
          return item;
        }
      })
    );
  }, [dayTradingData]);

  const onStrategicChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, strategic_name: value };
        } else {
          return item;
        }
      })
    );
  };

  const onLotSizeChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, qty: value };
        } else {
          return item;
        }
      })
    );
  };

  const onProfitLimitChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, profit_limit: value };
        } else {
          return item;
        }
      })
    );
  };

  const onLossLimitChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, loss_limit: value };
        } else {
          return item;
        }
      })
    );
  };

  const onCountofStockChange = (value, tradeCard) => {
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, count_of_stock: value };
        } else {
          return item;
        }
      })
    );
  };

  const onAutoTradeChange = (value, tradeCard) => {
    const payload = {
      tradeStatus: value ? 1 : 0,
      tradeType: tradeCard?.tradeType,
      tradingType: 1,
    };
    const currentCardsData = [...dayTradingCardData];
    setDayTradingCardsData(
      dayTradingCardData?.map((item) => {
        if (item?.tradeType == tradeCard?.tradeType) {
          return { ...item, tradeStatus: value ? 1 : 0 };
        } else {
          return item;
        }
      })
    );
    dispatch(
      updateDayTradingAutoTradeStatus(
        payload,
        (successMessage) => {
          message.success(successMessage || "Record updated successfully..");
        },
        (errorMessage) => {
          message.error(errorMessage || "Failed to update record");
          setDayTradingCardsData(currentCardsData);
        }
      )
    );
  };

  const onSaveCard = (tradeCard) => {
    const payload = { ...tradeCard };
    dispatch(
      updateDayTradingCardData(
        payload,
        (successMessage) => {
          message.success(successMessage || "Record updated successfully..");
        },
        (errorMessage) => {
          message.error(errorMessage || "Failed to update record");
        }
      )
    );
  };

  return (
    <div className="day-trading-panel-wrap">
      <Row gutter={[40, 24]}>
        {dayTradingCardData?.map((item) => {
          return (
            <Col span={8}>
              <div className="single-card">
                <div className="card-header">
                  <span className="header-title">{item?.label}</span>
                </div>
                <div className="card-body">
                  <Row align="middle" justify="center">
                    <div className="count-value success">
                      {dayTradingData_p_and_l &&
                        dayTradingData_p_and_l[item.tradeType] &&
                        dayTradingData_p_and_l[item.tradeType].total && (
                          <span>
                            {dayTradingData_p_and_l[item.tradeType].total}
                          </span>
                        )}
                    </div>
                  </Row>
                  <Row>
                    <div className="single-field">
                      <span className="label">Apply Strategic</span>
                      <Select
                        showSearch
                        value={item?.strategic_name}
                        placeholder="SELECT A STRATEGIC"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) => onStrategicChange(value, item)}
                      >
                        {strategicOptionsData?.map((item) => {
                          return (
                            <Option
                              className="options"
                              key={item?.id}
                              value={item?.strategicName}
                            >
                              {item?.strategicName}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Lot Size *</span>
                        <Input
                          value={item?.qty}
                          className="input-number"
                          size="large"
                          onChange={(e) =>
                            onLotSizeChange(e.target.value, item)
                          }
                        />
                      </div>
                    </Col>
                    {item?.show_count_of_stock && (
                      <Col span={12}>
                        <div className="single-field">
                          <span className="label">Count of Stock *</span>
                          <Input
                            value={item?.count_of_stock}
                            className="input-number"
                            size="large"
                            onChange={(e) =>
                              onCountofStockChange(e.target.value, item)
                            }
                          />
                        </div>
                      </Col>
                    )}
                  </Row>
                  <Row gutter={22}>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Profit Limit</span>
                        <Input
                          className="input-number"
                          value={item?.profit_limit}
                          size="large"
                          onChange={(e) =>
                            onProfitLimitChange(e.target.value, item)
                          }
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Add Loss Limit</span>
                        <Input
                          className="input-number"
                          value={item?.loss_limit}
                          size="large"
                          onChange={(e) =>
                            onLossLimitChange(e.target.value, item)
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={22} align="middle">
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Auto Trade</span>
                        <Switch
                          onClick={() => {
                            setModalOpen(true);
                          }}
                          className="trade-switch"
                          // checked={item?.tradeStatus}
                          // // onChange={(checked) =>
                          // //   onAutoTradeChange(checked, item)
                          // // }
                        />

                        {modalOpen && <Modal setOpenModal={setModalOpen} />}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="single-field">
                        <span className="label">Square Off</span>
                        <Switch
                          className="trade-switch"
                          onClick={() => {
                            setIsSquareModal(true);
                          }}
                        />
                        {isSquareModal && (
                          <SquareModal setSquareModalOpen={setIsSquareModal} />
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div
                        onClick={() => onSaveCard(item)}
                        className="save-btn"
                      >
                        <span>Save</span>
                      </div>
                      <span>
                        <b>Note: </b>
                        {item?.note}
                      </span>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default DayTrading;
