import { DOMAIN } from "../Utils/constants";
import request from "./request";

const domain = `${DOMAIN}/cinema_room`;

export const getCinemaRoomListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getCinemaRoomDetailService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "GET",
    });
  };
};

export const createCinemaRoomService = (data) => {
  return () => {
    return request({
      url: domain,
      method: "POST",
      data,
    });
  };
};

export const updateCinemaRoomService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteCinemaRoomService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "DELETE",
    });
  };
};
