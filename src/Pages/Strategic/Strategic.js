import React, { useEffect, useState } from "react";
import { Input, Pagination, Select, Table } from "antd";
import { HiSearch } from "react-icons/hi";
import "./Strategic.scss";
import { useDispatch, useSelector } from "react-redux";
import { getStrtegicOptionsData } from "../../Redux/Actions/dayTradingActions";
import { getStrategicsData } from "../../Redux/Actions/strategicActions";

const { Option } = Select;

function Strategic(props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [strategicsData, setStrategicsData] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [strategic, setStrategic] = useState(undefined);
  const [tradeType, setTradeType] = useState(undefined);
  const strategics = useSelector((state) => state?.Strategic?.strategics);
  const loading = useSelector(
    (state) => state?.Strategic?.loadingGetStrategics
  );
  const strategicOptionsData = useSelector(
    (state) => state?.DayTrading?.strategicOptions
  );

  useEffect(() => {
    dispatch(getStrategicsData());
    dispatch(getStrtegicOptionsData());
  }, []);

  useEffect(() => {
    setStrategicsData(
      strategics
        ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
        ?.filter((item) =>
          search
            ? item?.symbolname?.toLowerCase()?.includes(search?.toLowerCase())
            : true
        )
        ?.filter((item) =>
          strategic
            ? item?.strategy?.toLowerCase() == strategic?.toLowerCase()
            : true
        )
        ?.filter((item) => (tradeType ? item?.trade_type == tradeType : true))
    );
  }, [strategics, search, strategic, tradeType, page, pageSize]);

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
      dataIndex: "symbolname",
      key: "symbolname",
      align: "center",
    },
    {
      title: "Strategic Mode",
      dataIndex: "strategic_mode",
      key: "strategic_mode",
      align: "center",
    },
    {
      title: "From Date",
      dataIndex: "fromdate",
      key: "fromdate",
      align: "center",
    },
    {
      title: "To Date",
      key: "todate",
      dataIndex: "todate",
      align: "center",
    },
    {
      title: "Type Of Trading",
      key: "typeoftrading",
      dataIndex: "typeoftrading",
      align: "center",
    },
    {
      title: "Strategic Name",
      key: "strategy",
      dataIndex: "strategy",
      align: "center",
    },
    {
      title: "Capital",
      key: "Capital",
      dataIndex: "Capital",
      align: "center",
    },
    {
      title: "Total Trade",
      key: "totalclosetrade",
      dataIndex: "totalclosetrade",
      align: "center",
    },
    {
      title: "Net Profit",
      key: "netprofit",
      dataIndex: "netprofit",
      align: "center",
    },
    {
      title: "Gross Profit",
      key: "gorssprofit",
      dataIndex: "gorssprofit",
      align: "center",
    },
    {
      title: "Gross Loss",
      key: "grossloss",
      dataIndex: "grossloss",
      align: "center",
    },
    {
      title: "Max DrawDown",
      key: "maxdrawdown",
      dataIndex: "maxdrawdown",
      align: "center",
    },
    // {
    //   title: "SQUARE OFF",
    //   key: "action",
    //   align: "center",
    //   render: (text, record) => <span>-</span>,
    // },
  ];

  return (
    <div className="strategic-main-wrap">
      <div className="intraday-signal-scanner-main-wrap">
        <div className="table-top-panel-section">
          <div className="left-section">
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
              value={tradeType}
              onChange={(value) => setTradeType(value)}
              className="buy-sell-select"
              placeholder="Select trade"
              allowClear
              onClear={() => setTradeType(undefined)}
            >
              <Option className="options" value={"intraday"}>intraday</Option>
              <Option className="options" value={"positional"}>positional</Option>
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
            dataSource={strategicsData}
          />
          <div className="pagination-wrap">
            <Pagination
              pageSize={pageSize}
              current={page}
              showSizeChanger={false}
              onChange={(page) => setPage(page)}
              total={strategics?.length}
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
              {(page - 1) * pageSize + pageSize > strategics?.length
                ? strategics?.length
                : (page - 1) * pageSize + pageSize}{" "}
              of {strategics?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Strategic;
