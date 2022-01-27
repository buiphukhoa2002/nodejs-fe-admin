import React from "react";
import { DatePicker, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const MovieCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      trailer: "",
      duration_hour: "",
      duration_minute: "",
      startDate: "",
      rating: "",
      director: "",
      poster: "",
    },
  });

  const createMovie = () => {
    const hour = formik.values.duration_hour;
    const minute = formik.values.duration_minute;
    const final_hour = hour.length === 2 ? hour : `0${hour}`;
    const final_minute = minute.length === 2 ? minute : `0${minute}`;

    const newMovie = {
      ...formik.values,
      duration: `${final_hour}:${final_minute}:00`,
    };
    dispatch({
      type: sagaTypes.CREATE_MOVIE_SAGA,
      payload: newMovie,
    });
  };

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/movie")}
          style={{ cursor: "pointer" }}
        >
          Movie
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create movie</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row mt-4">
        <div className="col-12 col-md-6 mb-2">
          <p>Name</p>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <p>Trailer</p>
          <input
            type="text"
            name="trailer"
            className="form-control"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <p>Duration (hours)</p>
          <input
            type="number"
            min="0"
            name="duration_hour"
            className="form-control"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <p>Duration (minutes)</p>
          <input
            type="number"
            name="duration_minute"
            min="0"
            max="60"
            className="form-control"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <p>Start date</p>
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Chọn ngày chiếu"
            onChange={(value) => {
              formik.setFieldValue("startDate", dayjs(value).toISOString());
            }}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <p>Rating</p>
          <input
            type="number"
            max="10"
            min="0"
            name="rating"
            className="form-control"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <p>Directors</p>
          <input
            type="text"
            className="form-control"
            name="director"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <p>Poster</p>
          <input
            type="text"
            className="form-control"
            name="poster"
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 mb-2">
          <p>Description</p>
          <textarea
            name="description"
            id=""
            rows="10"
            className="form-control"
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary" onClick={createMovie}>
            Create movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCreate;
