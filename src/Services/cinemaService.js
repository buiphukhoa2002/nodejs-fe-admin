import { DOMAIN } from "../Utils/constants";
import request from "./request";

const domain = `${DOMAIN}/cinema`;

export const getCinemaListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getCinemaDetailService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "GET",
    });
  };
};

export const createCinemaService = (data) => {
  return () => {
    return request({
      url: domain,
      method: "POST",
      data,
    });
  };
};

export const updateCinemaService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteCinemaService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "DELETE",
    });
  };
};

export const updateCinemaImageService = (data) => {
  return () => {
    return request({
      url: `${domain}/upload-image/${data.id}`,
      method: "POST",
      data: data.data,
    });
  };
};
