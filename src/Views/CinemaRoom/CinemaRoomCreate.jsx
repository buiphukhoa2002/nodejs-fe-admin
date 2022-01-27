import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const CinemaRoomCreate = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    type: "normal",
  });
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createCinemaRoom = (e) => {
    e.preventDefault();
    const submittingValues = {
      ...formValues,
      cinemaId: cid,
    };
    dispatch({
      type: sagaTypes.CREATE_CINEMA_ROOM_SAGA,
      payload: submittingValues,
    });
  };

  const onFormFieldChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
      payload: cid,
    });
  }, [cid, dispatch]);

  const { cinemaDetail } = useSelector((state) => state.cinemaReducer);

  useEffect(() => {
    if (cinemaDetail) {
      dispatch({
        type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
        payload: cinemaDetail.cinemaSystemId,
      });
    }
  }, [cinemaDetail, dispatch]);

  const { cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );

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
        <Breadcrumb.Item>Add room</Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={createCinemaRoom}>
        <div className="row">
          <div className="form-group col-12 col-md-6">
            <p>Name</p>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={onFormFieldChange}
            />
          </div>
          <div className="form-group col-12 col-md-6">
            <p>Type</p>
            <select
              name="type"
              className="form-control"
              onChange={onFormFieldChange}
            >
              <option value="normal">Normal</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Create room
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CinemaRoomCreate;
