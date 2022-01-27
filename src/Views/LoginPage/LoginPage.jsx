import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: sagaTypes.SIGN_IN_SAGA,
      payload: data,
      callback: () => navigate("/"),
    });
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <p>Email</p>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onDataChange}
          />
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onDataChange}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
