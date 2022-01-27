import {
  Breadcrumb,
  Form,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Space,
} from "antd";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { useFormik } from "formik";
import dayjs from "dayjs";

const { Option } = Select;

const ShowTimeCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { mid, crid, csid, cid } = Object.fromEntries(urlSearchParams);

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    });
    dispatch({
      type: sagaTypes.GET_MOVIE_LIST_SAGA,
    });
    if (mid) {
      dispatch({
        type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
        payload: mid,
      });
    }
    if (csid) {
      dispatch({
        type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
        payload: csid,
      });
    }
    if (cid) {
      dispatch({
        type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
        payload: cid,
      });
    }
    if (crid) {
      dispatch({
        type: sagaTypes.GET_CINEMA_ROOM_DETAIL_SAGA,
        payload: crid,
      });
    }
  }, [dispatch, mid, csid, crid, cid]);

  const { cinemaSystemList, cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );
  const { cinemaDetail } = useSelector((state) => state.cinemaReducer);
  const { movieList, movieDetail } = useSelector((state) => state.movieReducer);
  const { cinemaRoomDetail } = useSelector((state) => state.cinemaRoomReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cinemaSystemId: cinemaSystemDetail ? cinemaSystemDetail.id : "",
      cinemaId: cinemaDetail ? cinemaDetail.id : "",
      cinemaRoomId: cinemaRoomDetail ? cinemaRoomDetail.id : "",
      movieDate: "",
      movieTime: "",
      movieId: movieDetail ? movieDetail.id : "",
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { cinemaRoomId, movieDate, movieTime, movieId } = formik.values;
      const startTime = new Date(
        movieDate.year(),
        movieDate.month(),
        movieDate.date(),
        movieTime.hour(),
        movieTime.minute(),
        movieTime.second(),
        0
      );
      const payload = {
        cinemaRoomId,
        movieId,
        startTime,
      };

      dispatch({
        type: sagaTypes.CREATE_SHOWTIME_SAGA,
        payload,
      });
    },
    [formik, dispatch]
  );

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/showtime")}
          style={{ cursor: "pointer" }}
        >
          Showtime
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create showtime</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row mt-3">
        <div className="col-12 col-md-8">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Movie">
              <Select
                placeholder="Choose a movie"
                value={formik.values.movieId}
                onChange={(value) => {
                  dispatch({
                    type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
                    payload: value,
                  });
                  formik.setFieldValue("movieId", value);
                }}
              >
                {movieList.map((movie) => {
                  return (
                    <Option key={movie.id} value={movie.id}>
                      {movie.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Cinema system">
              <Select
                placeholder="Choose a cinema system"
                value={formik.values.cinemaSystemId}
                onChange={(value) => {
                  dispatch({
                    type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
                    payload: value,
                  });
                  formik.setFieldValue("cinemaSystemId", value);
                  formik.setFieldValue("cinemaId", "");
                  formik.setFieldValue("cinemaRoomId", "");
                }}
              >
                {cinemaSystemList.map((cinemaSystem) => {
                  return (
                    <Option key={cinemaSystem.id} value={cinemaSystem.id}>
                      {cinemaSystem.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Cinema">
              <Select
                placeholder="Choose a cinema"
                value={formik.values.cinemaId}
                onChange={(value) => {
                  dispatch({
                    type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
                    payload: value,
                  });
                  formik.setFieldValue("cinemaId", value);
                  formik.setFieldValue("cinemaRoomId", "");
                }}
              >
                {cinemaSystemDetail?.Cinemas.map((cinema) => {
                  return (
                    <Option key={cinema.id} value={cinema.id}>
                      {cinema.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Cinema room">
              <Select
                placeholder="Choose a room"
                name="cinemaRoomId"
                value={formik.values.cinemaRoomId}
                onChange={(value) =>
                  formik.setFieldValue("cinemaRoomId", value)
                }
              >
                {cinemaDetail?.CinemaRooms.map((room) => {
                  return (
                    <Option key={room.id} value={room.id}>
                      Room {room.name} ({room.type})
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Datetime">
              <Space>
                <DatePicker
                  format="DD/MM/YY"
                  placeholder="Choose a date"
                  onChange={(value) => {
                    formik.setFieldValue("movieDate", dayjs(value));
                  }}
                />
                <TimePicker
                  placeholder="Choose a time"
                  onChange={(value) => {
                    formik.setFieldValue("movieTime", dayjs(value));
                  }}
                />
              </Space>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" onClick={handleSubmit}>
                Create showtime
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-12 col-md-4">
          <img
            src={movieDetail?.poster}
            alt="film poster"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowTimeCreate;
