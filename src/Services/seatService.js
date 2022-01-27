import { DOMAIN } from "../Utils/constants";
import request from "./request";

const domain = `${DOMAIN}/seat`;

export const getSeatListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getSeatsByShowtimeService = (showtime_id) => {
  return () => {
    return request({
      url: `${domain}/get-seats-by-showtime/${showtime_id}`,
      method: "GET",
    });
  };
};

export const getSeatDetailService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "GET",
    });
  };
};

export const createSeatService = (data) => {
  return () => {
    return request({
      url: domain,
      method: "POST",
      data,
    });
  };
};

export const createMultipleSeatsService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.num}`,
      method: "POST",
      data,
    });
  };
};

export const updateSeatService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteSeatService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "DELETE",
    });
  };
};
