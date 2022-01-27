import { Button, Input, Popconfirm, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
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

const Movie = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_MOVIE_LIST_SAGA,
    });
  }, [dispatch]);

  const movieList = useSelector((state) => state.movieReducer.movieList);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "name");
      },
    },
    {
      title: "poster",
      dataIndex: "poster",
      key: "poster",
      render: (text, record, index) => {
        if (text) {
          return (
            <img
              src={text}
              alt="poster"
              style={{ width: 50, height: 50, cursor: "pointer" }}
              onClick={() => navigate(`/movie/update-poster/${record.id}`)}
            />
          );
        }
        return (
          <Button onClick={() => navigate(`/movie/update-poster/${record.id}`)}>
            +
          </Button>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text, record, index) => {
        const date = dayjs(text);
        return `${date.date()}/${date.month() + 1}/${date.year()}`;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Director",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Tooltip title="Create showtime">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() => navigate(`/showtime/create?mid=${record.id}`)}
              >
                <CalendarOutlined />
              </span>
            </Tooltip>
            <Tooltip title="Edit">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={() => navigate(`/movie/update/${record.id}`)}
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Popconfirm
              title={`Are you sure to delete ${record.name}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_MOVIE_SAGA,
                  payload: record.id,
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
      <Button type="primary" onClick={() => navigate("/movie/create")}>
        Create new movie
      </Button>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search movie"
        className="mb-3 mt-3"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
      />
      <Table
        columns={columns}
        dataSource={movieList.filter((item) =>
          item.name.toLowerCase().startsWith(searchKeyword)
        )}
        rowKey={"id"}
      />
    </div>
  );
};

export default Movie;
