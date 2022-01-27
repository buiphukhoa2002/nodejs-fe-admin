import { DOMAIN } from "../Utils/constants";
import request from "./request";

const domain = `${DOMAIN}/ticket`;

export const getTicketListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getTicketDetailService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "GET",
    });
  };
};

export const createTicketService = (data) => {
  return () => {
    return request({
      url: domain,
      method: "POST",
      data,
    });
  };
};

export const updateTicketService = (data) => {
  return () => {
    return request({
      url: `${domain}/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteTicketService = (id) => {
  return () => {
    return request({
      url: `${domain}/${id}`,
      method: "DELETE",
    });
  };
};
