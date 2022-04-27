import React, { useEffect, useState } from "react";
import { Table, Tag, Space, message } from "antd";
import { HiSwitchHorizontal } from "react-icons/hi";
import "./OpenPosition.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getOpenPositions,
  squareOffOrder,
} from "../../../../Redux/Actions/positionsActions";

function OpenPosition(props) {
  const [positionsData, setPositionsData] = useState([]);
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.Positions.positions);
  const positionsLoading = useSelector(
    (state) => state.Positions.loadingGetPositions
  );

  const loadingSquareOffPosition = useSelector(
    (state) => state.Positions.loadingSquareOffPosition
  );

  useEffect(() => {
    dispatch(getOpenPositions());
  }, []);

  useEffect(() => {
    setPositionsData(positions || []);
  }, [positions]);

  const onSquareOfOrder = (record) => {
    const data = {
      Bqty: record?.Bqty,
      Sqty: record?.Sqty,
      PCode: record?.PCode,
      broker_client_id: record?.broker_client_id,
      Tsym: record?.Tsym,
      exchange: record?.exchange,
      entry_price: record?.entry_price,
    };
    dispatch(
      squareOffOrder(
        data,
        () => {
          message.success("Squred off successfully..");
          dispatch(getOpenPositions());
        },
        (error) => {
          message.error(error || "Failed to square off order..");
        }
      )
    );
  };

  const columns = [
    {
      title: "EXCHANGE",
      dataIndex: "exchange",
      key: "exchange",
      align: "center",
    },
    {
      title: "ORDER TYPE",
      dataIndex: "PCode",
      key: "PCode",
      align: "center",
    },
    {
      title: "SYMBOL NAME",
      dataIndex: "Tsym",
      key: "Tsym",
      align: "center",
    },
    {
      title: "BUY QTY",
      key: "Bqty",
      dataIndex: "Bqty",
      align: "center",
    },
    {
      title: "SELL QTY",
      key: "Sqty",
      dataIndex: "Sqty",
      align: "center",
    },
    {
      title: "LTP",
      key: "ltp",
      dataIndex: "ltp",
      align: "center",
    },
    {
      title: "P&L",
      key: "MtoM",
      dataIndex: "MtoM",
      align: "center",
      render: (text, record) => (
        <div className={`pl_cell ${text >= 0 ? "green" : "red"}`}>
          <span>{text > 0 ? `+${text}` : `${text}`}</span>
        </div>
      ),
    },
    {
      title: "SQUARE OFF",
      key: "action",
      align: "center",
      render: (text, record) =>
        record?.Bqty !== record?.Sqty && (
          <HiSwitchHorizontal
            onClick={() => onSquareOfOrder(record)}
            className="square-off-icon"
          />
        ),
    },
  ];

  return (
    <div className="open-position-main-wrap">
      <Table
        loading={positionsLoading || loadingSquareOffPosition}
        columns={columns}
        dataSource={positionsData}
      />
    </div>
  );
}

export default OpenPosition;
