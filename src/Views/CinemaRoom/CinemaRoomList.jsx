import {
  Breadcrumb,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Button,
  Tag,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const CinemaRoomList = () => {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
      payload: cid,
    });
  }, [dispatch, cid]);

  const { cinemaDetail } = useSelector((state) => state.cinemaReducer);

  useEffect(() => {
    if (cinemaDetail) {
      dispatch({
        type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
        payload: cinemaDetail.cinemaSystemId,
      });
    }
  }, [cinemaDetail, dispatch]);

  const { cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record, index) => {
        if (text.toLowerCase() === "vip")
          return (
            <Tag color="gold">
              <b>VIP</b>
            </Tag>
          );
        return <Tag color="blue">{text}</Tag>;
      },
    },
    {
      title: "Showtime list",
      render: (text, record, index) => {
        return (
          <div>
            <OrderedListOutlined
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/cinema-room/showtime-list/${record.id}`)
              }
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
            <Tooltip title="Add showtime">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/showtime/create?csid=${cinemaSystemDetail?.id}&cid=${cid}&crid=${record.id}`
                  )
                }
              >
                <CalendarOutlined />
              </span>
            </Tooltip>

            <Tooltip title="Edit">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/cinema-room/update?rid=${record.id}&cid=${cid}&csid=${cinemaDetail?.cinemaSystemId}`
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
                  type: sagaTypes.DELETE_CINEMA_ROOM_SAGA,
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
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/cinema-system")}
          style={{ cursor: "pointer" }}
        >
          Cinema System
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            navigate(
              `/cinema-system/cinema-list/${cinemaDetail?.cinemaSystemId}`
            )
          }
          style={{ cursor: "pointer" }}
        >
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {cinemaDetail ? cinemaDetail.name : ""}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Button
        className="mt-3 mb-3"
        type="primary"
        onClick={() => {
          navigate(`/cinema-room/create/${cid}`);
        }}
      >
        Add rooms
      </Button>
      <Table
        columns={columns}
        dataSource={cinemaDetail?.CinemaRooms}
        rowKey={"id"}
      />
    </div>
  );
};

export default CinemaRoomList;
