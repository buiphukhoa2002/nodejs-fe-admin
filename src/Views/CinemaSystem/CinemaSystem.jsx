import { Popconfirm, Space, Tooltip, Button, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const CinemaSystem = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    });
  }, [dispatch]);

  const cinemaSystemList = useSelector(
    (state) => state.cinemaSystemReducer.cinemaSystemList
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "logo",
      dataIndex: "logo",
      key: "logo",
      render: (text, record, index) => {
        if (text) {
          return (
            <img
              src={text}
              alt="logo"
              style={{ width: 50, height: 50, cursor: "pointer" }}
              onClick={() => {}}
            />
          );
        }
        return <Button onClick={() => {}}>+</Button>;
      },
    },
    {
      title: "Cinema List",
      render: (text, record, index) => {
        return (
          <div>
            <OrderedListOutlined
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/cinema-system/cinema-list/${record.id}`)
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
            <Tooltip title="Edit">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() => navigate(`/cinema-system/update/${record.id}`)}
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Popconfirm
              title={`Are you sure to delete ${record.name}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_CINEMA_SYSTEM_SAGA,
                  payload: record.id,
                });
              }}
              okText="Delete"
              cancelText="Cancel"
            >
              <Tooltip title="Delete cinema system">
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
        onClick={() => {
          setIsCreating(!isCreating);
        }}
      >
        {isCreating ? "Cancel" : "Create a new cinema system"}
      </Button>
      {isCreating && <CreateCinemaList />}
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search cinema systems"
        className="mb-3 mt-3"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
      />
      <Table
        columns={columns}
        dataSource={cinemaSystemList.filter((item) =>
          item.name.toLowerCase().startsWith(searchKeyword)
        )}
        rowKey={"id"}
      />
    </div>
  );
};

const CreateCinemaList = () => {
  const dispatch = useDispatch();
  const [cinemaSysInfo, setCinemaSysInfo] = useState({
    name: "",
    logo: "",
  });

  const onInputChange = (e) => {
    setCinemaSysInfo({ ...cinemaSysInfo, [e.target.name]: e.target.value });
  };

  const createCinema = () => {
    dispatch({
      type: sagaTypes.CREATE_CINEMA_SYSTEM_SAGA,
      payload: cinemaSysInfo,
    });
  };

  return (
    <div>
      <hr />
      <div className="row">
        <div className="col-5">
          <p>Name</p>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={onInputChange}
          />
        </div>
        <div className="col-5">
          <p>Logo URL</p>
          <input
            type="text"
            name="logo"
            className="form-control"
            onChange={onInputChange}
          />
        </div>
        <div className="col-2 mt-4 pt-2">
          <button className="btn btn-success" onClick={createCinema}>
            Create
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CinemaSystem;
