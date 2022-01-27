import { Breadcrumb } from "antd";
import { useFormik } from "formik";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const CinemaCreate = () => {
  const { csid } = useParams(); // Cinema system id
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      address: "",
    },
  });

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
      payload: csid,
    });
  }, [dispatch, csid]);

  const cinemaSystemDetail = useSelector(
    (state) => state.cinemaSystemReducer.cinemaSystemDetail
  );

  const addCinema = () => {
    const cinemaInfo = {
      ...formik.values,
      cinemaSystemId: csid,
    };
    dispatch({
      type: sagaTypes.CREATE_CINEMA_SAGA,
      payload: cinemaInfo,
    });
  };

  return (
    <div>
      <Breadcrumb style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/cinema-system")}>
          Cinema System
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => navigate(`/cinema-system/cinema-list/${csid}`)}
        >
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add new cinema</Breadcrumb.Item>
      </Breadcrumb>

      <div className="container mt-4">
        <div className="row">
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
            <p>Image URL</p>
            <input
              type="text"
              name="image"
              className="form-control"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-12 mb-2">
            <p>Address</p>
            <input
              type="text"
              name="address"
              className="form-control"
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-12 mb-2">
            <button className="btn btn-success" onClick={addCinema}>
              Add cinema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaCreate;
