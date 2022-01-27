import request from "./request";
import { DOMAIN } from "./../Utils/constants";

export const getMovieListService = () => {
  return request({
    url: `${DOMAIN}/movie`,
    method: "GET",
  });
};

export const getMovieDetailService = (id) => {
  return () => {
    return request({
      url: `${DOMAIN}/movie/${id}`,
      method: "GET",
    });
  };
};

export const createMovieService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/movie/`,
      method: "POST",
      data,
    });
  };
};

export const updateMovieService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/movie/${data.id}`,
      method: "PUT",
      data,
    });
  };
};

export const deleteMovieService = (id) => {
  return () => {
    return request({
      url: `${DOMAIN}/movie/${id}`,
      method: "DELETE",
    });
  };
};

export const uploadMoviePosterService = (data) => {
  return () => {
    return request({
      url: `${DOMAIN}/movie/upload-poster/${data.id}`,
      method: "POST",
      data: data.data,
    });
  };
};
