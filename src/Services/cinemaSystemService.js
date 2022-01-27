import { DOMAIN } from "../Utils/constants";
import request from "./request";

const domain = `${DOMAIN}/cinema_system`;

export const getCinemaSystemListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getCinemaSystemDetailService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "GET",
    });
  };
};

export const createCinemaSystemService = (data) => {
  return () => {
    return request({
      url: domain,
      method: "POST",
      data,
    });
  };
};

export const updateCinemaSystemService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteCinemaSystemService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "DELETE",
    });
  };
};

export const updateCinemaSystemLogoService = (data) => {
  return () => {
    return request({
      url: `${domain}/upload-logo/${data.id}`,
      method: "POST",
      data: data.data,
    });
  };
};
