import { DOMAIN } from "../Utils/constants";
import request from "./request";

const domain = `${DOMAIN}/showtime`;

export const getShowtimeListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getShowtimeDetailService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "GET",
    });
  };
};

export const createShowtimeService = (data) => {
  return () => {
    return request({
      url: domain,
      method: "POST",
      data,
    });
  };
};

export const updateShowtimeService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteShowtimeService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "DELETE",
    });
  };
};
