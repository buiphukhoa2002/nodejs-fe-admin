import { Breadcrumb } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const CinemaRoomUpdate = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { rid, cid, csid } = Object.fromEntries(urlSearchParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cid || !rid) {
      navigate("/");
    }
    dispatch({
      type: sagaTypes.GET_CINEMA_ROOM_DETAIL_SAGA,
      payload: rid,
    });
    dispatch({
      type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
      payload: cid,
    });
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
      payload: csid,
    });
  }, [dispatch, rid, cid, csid, navigate]);

  const { cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );
  const { cinemaDetail } = useSelector((state) => state.cinemaReducer);
  const { cinemaRoomDetail } = useSelector((state) => state.cinemaRoomReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: cinemaRoomDetail ? cinemaRoomDetail.id : "",
      name: cinemaRoomDetail ? cinemaRoomDetail.name : "",
      type: cinemaRoomDetail ? cinemaRoomDetail.type : "",
    },
  });

  const editRoom = () => {
    dispatch({
      type: sagaTypes.UPDATE_CINEMA_ROOM_SAGA,
      payload: formik.values,
    });
  };

  return (
    <div className="controller">
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/cinema-system")}
          style={{ cursor: "pointer" }}
        >
          Cinema System
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() =>
            navigate(
              `/cinema-system/cinema-list/${cinemaDetail?.cinemaSystemId}`
            )
          }
          style={{ cursor: "pointer" }}
        >
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            navigate(`/cinema/room-list/${cinemaDetail?.id}`);
          }}
          style={{ cursor: "pointer" }}
        >
          {cinemaDetail ? cinemaDetail.name : ""}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit room</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
        <div className="form-group col-12 col-md-6">
          <p>Name</p>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group col-12 col-md-6">
          <p>Type</p>
          <input
            type="text"
            name="type"
            className="form-control"
            value={formik.values.type}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <button className="btn btn-success" onClick={editRoom}>
            Edit room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaRoomUpdate;
