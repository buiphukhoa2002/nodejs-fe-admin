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

const ShowTimeUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { sid, cid } = Object.fromEntries(urlSearchParams);

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_MOVIE_LIST_SAGA,
    });
    dispatch({
      type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
      payload: cid,
    });
    dispatch({
      type: sagaTypes.GET_SHOWTIME_DETAIL_SAGA,
      payload: sid,
    });
  }, [dispatch, cid, sid]);

  const { cinemaDetail } = useSelector((state) => state.cinemaReducer);
  const { movieList, movieDetail } = useSelector((state) => state.movieReducer);
  const { showtimeDetail } = useSelector((state) => state.showtimeReducer);

  useEffect(() => {
    if (showtimeDetail) {
      dispatch({
        type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
        payload: showtimeDetail.movieId,
      });
    }
  }, [dispatch, showtimeDetail]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: sid,
      cinemaId: cinemaDetail ? cinemaDetail.id : "",
      cinemaRoomId: showtimeDetail ? showtimeDetail.cinemaRoomId : "",
      movieDate: showtimeDetail ? dayjs(showtimeDetail.startTime) : "",
      movieTime: showtimeDetail ? dayjs(showtimeDetail.startTime) : "",
      movieId: showtimeDetail ? showtimeDetail.movieId : "",
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { cinemaRoomId, movieDate, movieTime, movieId } = formik.values;
      const startTime = new Date(
        movieDate.year(),
        movieDate.month() + 1,
        movieDate.date(),
        movieTime.hour(),
        movieTime.minute() + 1,
        movieTime.second(),
        0
      );
      const payload = {
        id: sid,
        cinemaRoomId,
        movieId,
        startTime,
      };

      dispatch({
        type: sagaTypes.UPDATE_SHOWTIME_SAGA,
        payload,
      });
    },
    [formik, dispatch, sid]
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
        <Breadcrumb.Item>Update showtime</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row mt-3">
        <div className="col-12 mb-3">
          <h4>Cinema: {cinemaDetail?.name}</h4>
          <h4>
            Current movie date and time:{" "}
            {showtimeDetail
              ? dayjs(showtimeDetail.startTime).format("DD/MM/YYYY hh:mm")
              : ""}
          </h4>
        </div>

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
                Edit showtime
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

export default ShowTimeUpdate;
