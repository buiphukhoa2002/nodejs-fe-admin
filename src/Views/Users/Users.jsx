import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { Table, Space, Popconfirm, Button, Input, Tooltip, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const stringCompare = (string2, string1, comparingField) => {
  if (
    string2[comparingField].trim().toLowerCase() <
    string1[comparingField].trim().toLowerCase()
  ) {
    return -1; // swap
  }
  return 1; // positions stay same
};

const Users = () => {
  const [createUser, setCreateUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_USER_LIST_SAGA,
    });
  }, [dispatch]);

  const userList = useSelector((state) => state.userReducer.userList);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "email");
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "name");
      },
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "phone");
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "role");
      },
      render: (text, record, index) => {
        if (text.toLowerCase().trim() === "admin") {
          return <Tag color="magenta">{text}</Tag>;
        }
        return <Tag color="green">{text}</Tag>;
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
                onClick={() => {
                  navigate(`/users/edit/${record.id}`);
                }}
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Popconfirm
              title={`Are you sure to delete ${record.name}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_USER_SAGA,
                  payload: record,
                });
              }}
              // onCancel
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
      <div className="mb-3">
        <Button onClick={() => setCreateUser(!createUser)}>
          {createUser ? "Cancel" : "Create new user"}
        </Button>
        {createUser ? <CreateUser /> : <></>}
        <hr />
        <Input
          prefix={<SearchOutlined />}
          placeholder="Find user..."
          className="mb-3"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
      </div>

      <Table
        columns={columns}
        dataSource={userList.filter(
          (item) =>
            item.email.toLowerCase().startsWith(searchKeyword) ||
            item.name.toLowerCase().startsWith(searchKeyword)
        )}
        rowKey={"id"}
      />
    </div>
  );
};

const CreateUser = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "ADMIN",
  });

  const onInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch({
      type: sagaTypes.CREATE_USER_SAGA,
      payload: userInfo,
    });
  };

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-12 col-md-6 form-group">
          <p>Email</p>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onInputChange}
          />
        </div>
        <div className="col-12 col-md-6 form-group">
          <p>Password</p>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onInputChange}
          />
        </div>
        <div className="col-12 col-md-6 form-group">
          <p>Name</p>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={onInputChange}
          />
        </div>
        <div className="col-12 col-md-3 form-group">
          <p>Phone number</p>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={onInputChange}
          />
        </div>
        <div className="col-12 col-md-3 form-group">
          <p>Role</p>
          <select onChange={onInputChange} name="role" className="form-control">
            <option value="ADMIN">ADMIN</option>
            <option value="CLIENT">CLIENT</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <Button type="primary" onClick={onSubmit}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Users;
