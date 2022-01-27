import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const MovieUpdatePoster = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
      payload: id,
    });
  }, [dispatch, id]);

  const movieDetail = useSelector((state) => state.movieReducer.movieDetail);
  const [poster, setPoster] = useState("");

  const onPosterSave = () => {
    if (poster === "") {
      alert("Please upload a file");
    }
    const formData = new FormData();
    formData.append("movie_poster", poster);

    dispatch({
      type: sagaTypes.UPDATE_MOVIE_POSTER_SAGA,
      payload: {
        id,
        data: formData,
      },
    });
  };

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/movie")}
          style={{ cursor: "pointer" }}
        >
          Movie
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update movie poster</Breadcrumb.Item>
      </Breadcrumb>

      <div className="mt-3">
        <div className="row">
          <div className="col-12 col-md-4">
            {movieDetail && movieDetail.poster ? (
              <img
                src={movieDetail.poster}
                alt="poster"
                style={{ width: "100%" }}
              />
            ) : (
              <p>This movie has no poster</p>
            )}
          </div>
          <div className="col-12 col-md-6">
            <div>
              <b>Upload new poster</b>
              <br></br>
              <p></p>
              <input
                type="file"
                onChange={(e) => {
                  setPoster(e.target.files[0]);
                }}
              />
            </div>
            <button className="btn btn-success mt-3" onClick={onPosterSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieUpdatePoster;
