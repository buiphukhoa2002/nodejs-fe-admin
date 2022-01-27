import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { Popconfirm, Space, Tooltip, Button, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const ShowTime = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_SHOWTIME_LIST_SAGA,
    });
  }, [dispatch]);

  const { showtimeList } = useSelector((state) => state.showtimeReducer);

  const columns = [
    {
      title: "Showtime ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Movie",
      render: (text, record, index) => {
        return (
          <div>
            <img
              src={record.Movie.poster}
              alt="something"
              style={{ width: 50, height: 50, marginRight: 20 }}
            ></img>
            {record.Movie.name}
          </div>
        );
      },
    },
    {
      title: "Cinema",
      render: (text, record, index) => {
        return record.CinemaRoom.Cinema.name;
      },
    },
    {
      title: "Date",
      dataIndex: "startTime",
      render: (text, record, index) => {
        const date = dayjs(text);
        return `${date.date()}/${date.month() + 1}/${date.year()}`;
      },
    },
    {
      title: "Time",
      dataIndex: "startTime",
      render: (text, record, index) => {
        return dayjs(text).format("HH:mm");
      },
    },
    {
      title: "Seat list",
      render: (text, record, index) => {
        return (
          <div>
            <OrderedListOutlined
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/seat/${record.id}`)}
            />
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Tooltip title="Edit">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/showtime/update?sid=${record.id}&cid=${record.CinemaRoom.Cinema.id}`
                  )
                }
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Popconfirm
              title={`Are you sure to delete ${record.name}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_SHOWTIME_SAGA,
                  payload: record,
                });
              }}
              okText="Delete"
              cancelText="Cancel"
            >
              <Tooltip title="Delete user">
                <span style={{ color: "red", cursor: "pointer" }}>
                  <DeleteOutlined />
                </span>
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="mb-3"
        onClick={() => navigate(`/showtime/create`)}
      >
        Create showtime
      </Button>
      <Table columns={columns} dataSource={showtimeList} rowKey={"id"} />
    </div>
  );
};

export default ShowTime;
