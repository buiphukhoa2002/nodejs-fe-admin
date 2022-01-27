import {
  Popconfirm,
  Space,
  Tooltip,
  Button,
  Input,
  Table,
  Breadcrumb,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const CinemaSystemList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
      payload: id,
    });
  }, [dispatch, id]);

  const cinemaSystemDetail = useSelector(
    (state) => state.cinemaSystemReducer.cinemaSystemDetail
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (text, record, index) => {
        if (text) {
          return (
            <img
              src={text}
              alt="cinema img"
              style={{ width: 100, height: 50, cursor: "pointer" }}
              onClick={() => {}}
            />
          );
        }
        return <Button onClick={() => {}}>+</Button>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cinema rooms",
      render: (text, record, index) => {
        return (
          <div>
            <OrderedListOutlined
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/cinema/room-list/${record.id}`)}
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
                  navigate(`/cinema/update?cid=${record.id}&csid=${id}`)
                }
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Popconfirm
              title={`Are you sure to delete ${record.name}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_CINEMA_SAGA,
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
        <Breadcrumb.Item>
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
      </Breadcrumb>
      <Button
        className="mt-3"
        type="primary"
        onClick={() => {
          navigate(`/cinema/create/${id}`);
        }}
      >
        Add cinema
      </Button>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search cinemas"
        className="mb-3 mt-3"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
      />
      <Table
        columns={columns}
        dataSource={cinemaSystemDetail?.Cinemas.filter((item) =>
          item.name.toLowerCase().startsWith(searchKeyword)
        )}
        rowKey={"id"}
      />
    </div>
  );
};

export default CinemaSystemList;
