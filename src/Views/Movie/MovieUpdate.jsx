import React, { useEffect } from "react";
import { DatePicker, Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { useSelector } from "react-redux";

const MovieUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
      payload: id,
    });
  }, [dispatch, id]);

  const movieDetail = useSelector((state) => state.movieReducer.movieDetail);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: movieDetail ? movieDetail.id : "",
      name: movieDetail ? movieDetail.name : "",
      description: movieDetail ? movieDetail.description : "",
      trailer: movieDetail ? movieDetail.trailer : "",
      duration_hour: movieDetail ? movieDetail.duration.split(":")[0] : "",
      duration_minute: movieDetail ? movieDetail.duration.split(":")[1] : "",
      startDate: movieDetail ? movieDetail.startDate : "",
      rating: movieDetail ? movieDetail.rating : "",
      director: movieDetail ? movieDetail.director : "",
    },
  });

  const updateMovie = () => {
    const hour = formik.values.duration_hour;
    const minute = formik.values.duration_minute;
    const final_hour = hour.length === 2 ? hour : `0${hour}`;
    const final_minute = minute.length === 2 ? minute : `0${minute}`;

    const newMovie = {
      ...formik.values,
      duration: `${final_hour}:${final_minute}:00`,
    };
    dispatch({
      type: sagaTypes.UPDATE_MOVIE_SAGA,
      payload: newMovie,
    });
  };

  const renderCurrentDate = () => {
    const date = dayjs(formik.values.startDate);
    return `${date.date()}/${date.month()}/${date.year()}`;
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
        <Breadcrumb.Item>Edit movie</Breadcrumb.Item>
      </Breadcrumb>
      <div className="row mt-4">
        <div className="col-12 col-md-6 mb-2">
          <p>Name</p>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-6 mb-2">
          <p>Trailer</p>
          <input
            type="text"
            name="trailer"
            className="form-control"
            value={formik.values.trailer}
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
            value={formik.values.duration_hour}
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
            value={formik.values.duration_minute}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-3 mb-2">
          <p>Start date (Current: {renderCurrentDate()})</p>
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Edit date"
            className="form-control"
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
            value={formik.values.rating}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12  mb-2">
          <p>Directors</p>
          <input
            type="text"
            className="form-control"
            name="director"
            value={formik.values.director}
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
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <div className="col-12 mb-2">
          <button className="btn btn-primary" onClick={updateMovie}>
            Update movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieUpdate;
