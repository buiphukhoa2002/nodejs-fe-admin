import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { useFormik } from "formik";

const { TabPane } = Tabs;

const EditUser = () => {
  const { id } = useParams();
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Edit user information" key="1">
          <EditUserInformation id={id} />
        </TabPane>
        <TabPane tab="Change password" key="2">
          <UpdatePassword id={id} />
        </TabPane>
        <TabPane tab="Change avatar" key="3">
          <UpdateAvatar id={id} />
        </TabPane>
      </Tabs>
    </div>
  );
};

const EditUserInformation = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_USER_DETAIL_SAGA,
      payload: id,
    });
  }, [dispatch, id]);

  const userDetail = useSelector((state) => state.userReducer.userDetail);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userDetail.id ? userDetail.id : "",
      name: userDetail.name ? userDetail.name : "",
      phone: userDetail.phone ? userDetail.phone : "",
      email: userDetail.email ? userDetail.email : "",
      role: userDetail.role ? userDetail.role : "",
    },
  });

  const editUserInfo = (e) => {
    e.preventDefault();
    dispatch({
      type: sagaTypes.UPDATE_USER_SAGA,
      payload: formik.values,
    });
  };

  return (
    <form className="form" onSubmit={editUserInfo}>
      <div className="container">
        <div className="row">
          <div className="form-group col-6">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group col-6">
            <p>Phone</p>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group col-6">
            <p>Role</p>
            <select
              name="role"
              className="form-control"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENT">CLIENT</option>
            </select>
          </div>
          <div className="form-group col-6">
            <p>Name</p>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Edit user
        </button>
      </div>
    </form>
  );
};

const UpdatePassword = ({ id }) => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="container">
      <p>New password</p>
      <input
        type="password"
        placeholder="Enter a new password"
        className="form-control w-50"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p></p>
      <button
        className="btn btn-success"
        onClick={() => {
          dispatch({
            type: sagaTypes.UPDATE_USER_PASSWORD_SAGA,
            payload: {
              id,
              password,
            },
          });
        }}
      >
        Save new password
      </button>
    </div>
  );
};

const UpdateAvatar = ({ id }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_USER_DETAIL_SAGA,
      payload: id,
    });
  }, [dispatch, id]);

  const onAvatarSave = () => {
    if (avatar === "") {
      alert("Please upload a file");
    }
    const formData = new FormData();
    formData.append("avatar", avatar);

    dispatch({
      type: sagaTypes.UPDATE_USER_AVATAR_SAGA,
      payload: {
        id,
        data: formData,
      },
    });
  };

  const userDetail = useSelector((state) => state.userReducer.userDetail);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <b>Current avatar</b>
            <img
              src={
                userDetail.avatar
                  ? userDetail.avatar
                  : "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png"
              }
              alt="Avatar user"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-6 form-group">
            <div>
              <b>Upload new avatar</b>
              <br></br>
              <p></p>
              <input
                type="file"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
              />
            </div>
            <button className="btn btn-success mt-3" onClick={onAvatarSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
