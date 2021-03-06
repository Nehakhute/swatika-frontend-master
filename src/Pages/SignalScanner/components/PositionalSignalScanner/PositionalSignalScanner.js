import { Input, Pagination, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getStrtegicOptionsData } from "../../../../Redux/Actions/dayTradingActions";
import { getPositionalSignalscannerData } from "../../../../Redux/Actions/signalScannerActions";
import "./PositionalSignalScanner.scss";

const { Option } = Select;

function PositionalSignalScanner(props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [positionalData, setPositionalData] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [trendType, setTrendType] = useState(undefined);
  const [strategic, setStrategic] = useState(undefined);
  const [tradeType, setTradeType] = useState(undefined);
  const positionalScannerData = useSelector(
    (state) => state?.SignalScanner?.positionalSignalScannerData
  );
  const loading = useSelector(
    (state) => state?.SignalScanner?.loadingGetPositionalSignalScanner
  );
  const strategicOptionsData = useSelector(
    (state) => state?.DayTrading?.strategicOptions
  );

  useEffect(() => {
    const queryPayload = { type: 2 };
    dispatch(getPositionalSignalscannerData(queryPayload));
    dispatch(getStrtegicOptionsData());
  }, []);

  useEffect(() => {
    setPositionalData(
      positionalScannerData
        ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
        ?.filter((item) =>
          search
            ? item?.symbol_name?.toLowerCase()?.includes(search?.toLowerCase())
            : true
        )
        ?.filter((item) => (trendType ? item?.trend == trendType : true))
        ?.filter((item) =>
          strategic ? item?.strategic_name == strategic : true
        )
        ?.filter((item) => (tradeType ? item?.trade_type == tradeType : true))
    );
  }, [
    positionalScannerData,
    search,
    trendType,
    strategic,
    tradeType,
    pageSize,
    page,
  ]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text, record, index) => (
        <span>{(page - 1) * pageSize + (index + 1)}</span>
      ),
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "symbol_name",
      key: "symbol_name",
      align: "center",
    },
    {
      title: "TREND",
      dataIndex: "trend",
      key: "trend",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text == "BUY" ? "green" : "red"}`}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "CURRENT PRICE",
      key: "current_price",
      dataIndex: "current_price",
      align: "center",
    },
    {
      title: "ENTRY PRICE",
      key: "entry_price",
      dataIndex: "entry_price",
      align: "center",
    },
    {
      title: "STOP LOSS",
      key: "stop_loss",
      dataIndex: "stop_loss",
      align: "center",
    },
    {
      title: "Target",
      key: "target",
      dataIndex: "target",
      align: "center",
    },
    {
      title: "SIGNAL TYPE",
      key: "signal_type",
      dataIndex: "signal_type",
      align: "center",
    },
    {
      title: "Signal Date",
      key: "action",
      dataIndex: "createdAt",
      align: "center",
    },
  ];

  return (
    <div className="intraday-signal-scanner-main-wrap">
      <div className="table-top-panel-section">
        <div className="left-section">
          <Select
            value={tradeType}
            onChange={(value) => setTradeType(value)}
            allowClear
            onClear={() => setTradeType(undefined)}
            className="options-select"
            placeholder="select option"
          >
            {[
              "bankniftynfo",
              "niftynfo",
              "nsecash",
              "stocknfo",
              "mcxnfo",
              "nsecurrency",
            ]?.map((item) => {
              return (
                <Option className="options" value={item} key={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
          <Select
            className="options-select"
            value={strategic}
            allowClear
            onClear={() => setStrategic(undefined)}
            onChange={(value) => setStrategic(value)}
            placeholder="Select Strategic"
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
          <Select
            value={trendType}
            onChange={(value) => setTrendType(value)}
            className="buy-sell-select options"
            placeholder="Select trend"
            allowClear
            onClear={() => setTrendType(undefined)}
          >
            <Option className="options" value={"BUY"}>
              Buy
            </Option>
            <Option className="options" value={"SELL"}>
              Sell
            </Option>
          </Select>
        </div>
        <div className="right-section">
          <Input
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            suffix={<HiSearch />}
          />
        </div>
      </div>
      <div className="table-wrap">
        <Table
          loading={loading}
          pagination={false}
          columns={columns}
          dataSource={positionalData}
        />
        <div className="pagination-wrap">
          <Pagination
            pageSize={pageSize}
            current={page}
            showSizeChanger={false}
            onChange={(page) => setPage(page)}
            total={positionalScannerData?.length}
          />
          <span className="rows-per-page-title">Rows per page:</span>
          <Select
            className="page-select"
            value={pageSize}
            onChange={(value) => setPageSize(value)}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
          <span className="page-range">
            {(page - 1) * pageSize + 1}-
            {(page - 1) * pageSize + pageSize > positionalScannerData?.length
              ? positionalScannerData?.length
              : (page - 1) * pageSize + pageSize}{" "}
            of {positionalScannerData?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PositionalSignalScanner;
