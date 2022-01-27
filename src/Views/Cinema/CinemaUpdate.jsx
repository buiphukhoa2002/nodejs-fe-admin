import { Breadcrumb } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const CinemaUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { cid, csid } = Object.fromEntries(urlSearchParams);

  useEffect(() => {
    if (!cid || !csid) {
      navigate("/");
    }
    dispatch({
      type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
      payload: cid,
    });
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    });
  }, [cid, csid, navigate, dispatch]);

  const cinemaDetail = useSelector((state) => state.cinemaReducer.cinemaDetail);
  const { cinemaSystemList } = useSelector(
    (state) => state.cinemaSystemReducer
  );

  let cinemaSystemDetail;
  if (cinemaSystemList && cinemaDetail) {
    cinemaSystemDetail = cinemaSystemList.find(
      (item) => item.id === cinemaDetail.cinemaSystemId
    );
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: cinemaDetail ? cinemaDetail.id : "",
      name: cinemaDetail ? cinemaDetail.name : "",
      image: cinemaDetail ? cinemaDetail.image : "",
      address: cinemaDetail ? cinemaDetail.address : "",
      cinemaSystemId: cinemaDetail ? cinemaDetail.cinemaSystemId : "",
    },
  });

  const editCinema = () => {
    dispatch({
      type: sagaTypes.UPDATE_CINEMA_SAGA,
      payload: formik.values,
    });
  };

  return (
    <div>
      <Breadcrumb style={{ cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/cinema-system")}>
          Cinema System
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            if (cinemaSystemDetail) {
              navigate(`/cinema-system/cinema-list/${cinemaSystemDetail.id}`);
            }
          }}
        >
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit cinema</Breadcrumb.Item>
      </Breadcrumb>

      <div className="container mt-4">
        <div className="row">
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
            <p>Image URL</p>
            <input
              type="text"
              name="image"
              className="form-control"
              value={formik.values.image}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-12 mb-2">
            <p>Address</p>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-12 mb-2">
            <p>Cinema system</p>
            <select
              name="cinemaSystemId"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.cinemaSystemId}
            >
              {cinemaSystemList.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 mb-2">
            <button className="btn btn-success" onClick={editCinema}>
              Edit cinema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaUpdate;
