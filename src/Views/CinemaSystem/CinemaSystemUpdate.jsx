import { Breadcrumb } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const CinemaSystemUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logo, setLogo] = useState("");

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
      payload: id,
    });
  });

  const cinemaSystemDetail = useSelector(
    (state) => state.cinemaSystemReducer.cinemaSystemDetail
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: cinemaSystemDetail ? cinemaSystemDetail.id : "",
      name: cinemaSystemDetail ? cinemaSystemDetail.name : "",
      logo: cinemaSystemDetail ? cinemaSystemDetail.logo : "",
    },
  });

  const updateCinemaSystem = () => {
    dispatch({
      type: sagaTypes.UPDATE_CINEMA_SYSTEM_SAGA,
      payload: formik.values,
    });
  };

  const onLogoSave = () => {
    if (logo === "") {
      alert("Please upload a file");
    }
    const formData = new FormData();
    formData.append("cinema_system_logo", logo);

    dispatch({
      type: sagaTypes.UPDATE_CINEMA_SYSTEM_LOGO_SAGA,
      payload: {
        id,
        data: formData,
      },
    });
  };

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/cinema-system")}
          style={{ cursor: "pointer" }}
        >
          Cinema System
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit cinema system</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row mt-4 mb-3">
        <div className="col-3">
          <p>Name</p>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-7">
          <p>Logo URL</p>
          <input
            type="text"
            name="logo"
            className="form-control"
            value={formik.values.logo}
            onChange={formik.handleChange}
          />
        </div>
        <div className="col-2 mt-4 pt-2">
          <button className="btn btn-success" onClick={updateCinemaSystem}>
            Edit
          </button>
        </div>
      </div>

      <hr />

      <div className="mt-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <b>Current logo</b>
            {cinemaSystemDetail && cinemaSystemDetail.logo ? (
              <img
                src={cinemaSystemDetail.logo}
                alt="logo"
                style={{ width: "80%" }}
              />
            ) : (
              <p>This movie has no logo</p>
            )}
          </div>
          <div className="col-12 col-md-6">
            <div>
              <b>Upload new logo</b>
              <br></br>
              <p></p>
              <input
                type="file"
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                }}
              />
            </div>
            <button className="btn btn-success mt-3" onClick={onLogoSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaSystemUpdate;
