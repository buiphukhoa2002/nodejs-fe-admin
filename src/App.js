import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./Views/LoginPage/LoginPage";
import Home from "./Views/Home/Home";
import AuthTemplate from "./Templates/AuthTemplate";
import AdminTemplate from "./Templates/AdminTemplate";
import { useDispatch } from "react-redux";
import { sagaTypes } from "./Redux/constants/sagaTypes";
import Users from "./Views/Users/Users";
import EditUser from "./Views/Users/EditUser";
import Movie from "./Views/Movie/Movie";
import MovieCreate from "./Views/Movie/MovieCreate";
import MovieUpdate from "./Views/Movie/MovieUpdate";
import MovieUpdatePoster from "./Views/Movie/MovieUpdatePoster";
import CinemaSystem from "./Views/CinemaSystem/CinemaSystem";
import CinemaSystemUpdate from "./Views/CinemaSystem/CinemaSystemUpdate";
import CinemaSystemList from "./Views/CinemaSystem/CinemaSystemList";
import CinemaCreate from "./Views/Cinema/CinemaCreate";
import CinemaUpdate from "./Views/Cinema/CinemaUpdate";
import CinemaRoomList from "./Views/CinemaRoom/CinemaRoomList";
import CinemaRoomCreate from "./Views/CinemaRoom/CinemaRoomCreate";
import CinemaRoomUpdate from "./Views/CinemaRoom/CinemaRoomUpdate";
import ShowTime from "./Views/ShowTime/ShowTime";
import ShowTimeCreate from "./Views/ShowTime/ShowTimeCreate";
import ShowTimeUpdate from "./Views/ShowTime/ShowTimeUpdate";
import Seat from "./Views/Seat/Seat";
import Ticket from "./Views/Ticket/Ticket";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_USER_LOGIN_SAGA,
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<AuthTemplate children={<LoginPage />} />}
        />

        <Route
          path="/users/edit/:id"
          element={<AdminTemplate children={<EditUser />} />}
        />
        <Route path="/users" element={<AdminTemplate children={<Users />} />} />

        <Route
          path="/movie/create"
          element={<AdminTemplate children={<MovieCreate />} />}
        />
        <Route
          path="/movie/update/:id"
          element={<AdminTemplate children={<MovieUpdate />} />}
        />
        <Route
          path="/movie/update-poster/:id"
          element={<AdminTemplate children={<MovieUpdatePoster />} />}
        />
        <Route path="/movie" element={<AdminTemplate children={<Movie />} />} />

        <Route
          path="/cinema-system/update/:id"
          element={<AdminTemplate children={<CinemaSystemUpdate />} />}
        />
        <Route
          path="/cinema-system/cinema-list/:id" // Cinema system's id
          element={<AdminTemplate children={<CinemaSystemList />} />}
        />
        <Route
          path="/cinema-system"
          element={<AdminTemplate children={<CinemaSystem />} />}
        />

        <Route
          path="/cinema/create/:csid" // Cinema system's id
          element={<AdminTemplate children={<CinemaCreate />} />}
        />
        <Route
          path="/cinema/update"
          element={<AdminTemplate children={<CinemaUpdate />} />}
        />
        <Route
          path="/cinema/room-list/:cid" // Cinema's id
          element={<AdminTemplate children={<CinemaRoomList />} />}
        />

        <Route
          path="/cinema-room/create/:cid" // Cinema's id
          element={<AdminTemplate children={<CinemaRoomCreate />} />}
        />

        <Route
          path="/cinema-room/update"
          element={<AdminTemplate children={<CinemaRoomUpdate />} />}
        />

        <Route
          path="/showtime"
          element={<AdminTemplate children={<ShowTime />} />}
        />

        <Route
          path="/showtime/create"
          element={<AdminTemplate children={<ShowTimeCreate />} />}
        />

        <Route
          path="/showtime/update"
          element={<AdminTemplate children={<ShowTimeUpdate />} />}
        />

        <Route
          path="/seat/:sid"
          element={<AdminTemplate children={<Seat />} />}
        />

        <Route
          path="/ticket"
          element={<AdminTemplate children={<Ticket />} />}
        />

        <Route path="/*" element={<AdminTemplate children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
