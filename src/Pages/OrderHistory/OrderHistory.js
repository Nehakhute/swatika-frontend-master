import { Input, Pagination, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HiChatAlt, HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../Redux/Actions/orderHistoryAction";
import "./OrderHistory.scss";

const { Option } = Select;

function OrderHistory(props) {
  const [ordersData, setOrdersData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const orderHistoryData = useSelector(
    (state) => state?.OrderHistory?.orderHistory
  );
  const loadingGetOrderHistory = useSelector(
    (state) => state?.OrderHistory?.loadingGetOrderHistory
  );

  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);

  useEffect(() => {
    setOrdersData(
      orderHistoryData
        ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
        ?.filter((item) =>
          search
            ? item?.Trsym?.toLowerCase()?.includes(search?.toLowerCase())
            : true
        )
    );
  }, [orderHistoryData, page, pageSize, search]);

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
      dataIndex: "Trsym",
      key: "Trsym",
      align: "center",
    },
    {
      title: "TREND",
      dataIndex: "Trantype",
      key: "Trantype",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text == "B" ? "green" : "red"}`}>
          <span>{text == "B" ? "BUY" : "SELL"}</span>
        </div>
      ),
    },
    {
      title: "ORDER ID",
      dataIndex: "Nstordno",
      key: "Nstordno",
      align: "center",
    },
    {
      title: "QTY",
      key: "Qty",
      dataIndex: "Qty",
      align: "center",
    },
    {
      title: "ENTRY PRICE",
      key: "Prc",
      dataIndex: "Prc",
      align: "center",
    },
    {
      title: "DATE/ TIME",
      key: "OrderedTime",
      dataIndex: "OrderedTime",
      align: "center",
    },
    {
      title: "STATUS",
      key: "Status",
      dataIndex: "Status",
      align: "center",
      render: (text, record) => (
        <span
          className={`status ${
            text == "complete" ? "green-status" : "red-status"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "REJECTION REASON",
      key: "action",
      dataIndex: "RejReason",
      align: "center",
      render: (text, record) => (
        <span>
          <Tooltip arrowPointAtCenter placement="topRight" title={text}>
            <HiChatAlt className="chat-icon-wrap" />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div className="order-history-main-wrap">
      <div className="table-top-panel-section">
        <div className="left-section">
          <span className="title">Order History</span>
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
          loading={loadingGetOrderHistory}
          pagination={false}
          columns={columns}
          dataSource={ordersData}
        />
        <div className="pagination-wrap">
          <Pagination
            pageSize={pageSize}
            current={page}
            onChange={(page) => setPage(page)}
            total={orderHistoryData?.length}
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
            {(page - 1) * pageSize + pageSize > orderHistoryData?.length
              ? orderHistoryData?.length
              : (page - 1) * pageSize + pageSize}{" "}
            of {orderHistoryData?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
