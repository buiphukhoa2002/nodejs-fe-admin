import { DOMAIN } from "../Utils/constants";
import request from "./request";

export const signInService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/auth/sign-in`,
      method: "POST",
      data,
    });
  };
};

export const getUserLoginService = () => {
  return request({
    url: `${DOMAIN}/users/authenticate`,
    method: "GET",
  });
};

export const getUserListService = () => {
  return request({
    url: `${DOMAIN}/users/`,
    method: "GET",
  });
};

export const getUserDetailService = (id) => {
  return () => {
    return request({
      url: `${DOMAIN}/users/${id}`,
      method: "GET",
    });
  };
};

export const createUserService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/users/`,
      method: "POST",
      data,
    });
  };
};

export const updateUserService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/users/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const updatePasswordService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/users/password/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const updateUserAvatarService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/users/update-avatar/${data.id}`,
      method: "POST",
      data: data.data,
    });
  };
};

export const deleteUserService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/users/${data.id}`,
      method: "DELETE",
    });
  };
};
