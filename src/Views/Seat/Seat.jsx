import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import dayjs from "dayjs";
import "./Seat.css";

const Seat = () => {
  const { sid } = useParams();
  const dispatch = useDispatch();
  const [chosenSeat, setChosenSeat] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [userBooking, setUserBooking] = useState(null);
  const [seatUpdating, setSeatUpdating] = useState({
    id: "",
    name: "",
    status: "",
    type: "",
    price: "",
    showtimeId: sid,
  });
  const [numSeats, setNumSeats] = useState(null);

  const onUpdatingFormChange = (e) => {
    setSeatUpdating({
      ...seatUpdating,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_SHOWTIME_DETAIL_SAGA,
      payload: sid,
    });
    dispatch({
      type: sagaTypes.GET_SEAT_LIST_BY_SHOWTIME_SAGA,
      payload: sid,
    });
    dispatch({
      type: sagaTypes.GET_USER_LIST_SAGA,
    });
  }, [dispatch, sid]);

  const { showtimeDetail } = useSelector((state) => state.showtimeReducer);
  const { seatList, seatDetail } = useSelector((state) => state.seatReducer);
  const { userList } = useSelector((state) => state.userReducer);

  const renderSeats = () => {
    if (!seatList || seatList.length === 0) return <></>;
    return seatList
      .sort((a, b) => a.name - b.name)
      .map((seat) => {
        let classVipSeat = seat.type.toLowerCase() === "vip" ? "vip__seat" : "";
        let classUnavailableSeat = seat.status ? "unavailable__seat" : "";
        let classChosenSeat =
          seat.id === chosenSeat ? "currently__chosen__seat" : "";
        return (
          <div
            key={seat.id}
            className={`seat ${classUnavailableSeat} ${classVipSeat}  ${classChosenSeat}`}
            onClick={() => {
              setChosenSeat(seat.id);
              setIsUpdating(false);
              setIsBooking(false);
              dispatch({
                type: sagaTypes.GET_SEAT_DETAIL_SAGA,
                payload: seat.id,
              });
            }}
          >
            {seat.name}
          </div>
        );
      });
  };

  const bookTicket = () => {
    if (!seatDetail) return;
    if (seatDetail.status) {
      alert("Seat not available");
      return;
    }
    setIsBooking(true);
  };

  const bookTicketFinal = () => {
    if (!seatDetail) return;
    const newTicket = {
      userId: userBooking,
      seatId: seatDetail.id,
    };
    dispatch({
      type: sagaTypes.CREATE_TICKET_SAGA,
      payload: newTicket,
    });

    // Change unavailable to available
    dispatch({
      type: sagaTypes.UPDATE_SEAT_SAGA,
      payload: {
        ...seatDetail,
        status: true,
      },
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 col-md-9">
          <h4 style={{ textAlign: "center" }}>Seats</h4>
          <div className="seat__container">{renderSeats()}</div>
          <div className="mt-3">
            <hr />
            <h5 className="text-center">Types of seats</h5>
            <div className="row">
              <div className="col-3">
                <div className="seat">1</div>
                <div>Normal seat</div>
              </div>
              <div className="col-3">
                <div className="seat vip__seat">1</div>
                <div>VIP seat</div>
              </div>
              <div className="col-3">
                <div className="seat unavailable__seat">1</div>
                <div>Booked seat</div>
              </div>
              <div className="col-3">
                <div className="seat currently__chosen__seat">1</div>
                <div>Currently chosen seat</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <h4 style={{ textAlign: "center" }}>Showtime's information</h4>
          <p>
            <b>Cinema</b>:{" "}
            {showtimeDetail && showtimeDetail.CinemaRoom.Cinema.name}
          </p>
          <p>
            <b>Room</b>: {showtimeDetail && showtimeDetail.CinemaRoom.name}
          </p>
          <p>
            <b>Room type</b>: {showtimeDetail && showtimeDetail.CinemaRoom.type}
          </p>
          <p>
            <b>Movie</b>: {showtimeDetail && showtimeDetail.Movie.name}
          </p>
          <p>
            <b>Date + Time:</b>:{" "}
            {showtimeDetail &&
              dayjs(showtimeDetail.startTime).format("DD/MM/YYYY hh:mm")}
          </p>
          <h4 style={{ textAlign: "center" }}>Create new set of seats</h4>
          <input
            type="number"
            min="1"
            className="form-control w-75 d-inline"
            placeholder="Enter the number of seats"
            onChange={(e) => setNumSeats(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => {
              if (!numSeats) return;
              dispatch({
                type: sagaTypes.CREATE_MULTIPLE_SEATS_SAGA,
                payload: {
                  status: false,
                  price: 55000,
                  type: "normal",
                  showtimeId: sid,
                  num: numSeats,
                },
              });
            }}
          >
            Create
          </button>
          <h4 className="text-center mt-3">Seat information</h4>
          {chosenSeat &&
            (isUpdating ? (
              <>
                <p>
                  <b>Seat number:</b> {seatUpdating.name}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <select
                    value={seatUpdating.status}
                    className="form-control"
                    name="status"
                    onChange={onUpdatingFormChange}
                  >
                    <option value={false}>Available</option>
                    <option value={true}>Unavailable</option>
                  </select>
                </p>
                <p>
                  <b>Type:</b>{" "}
                  <select
                    value={seatUpdating.type}
                    className="form-control"
                    name="type"
                    onChange={onUpdatingFormChange}
                  >
                    <option value="normal">Normal</option>
                    <option value="VIP">VIP</option>
                  </select>
                </p>
                <p>
                  <b>Price:</b>{" "}
                  <input
                    type="number"
                    name="price"
                    value={seatUpdating.price}
                    className="form-control"
                    onChange={onUpdatingFormChange}
                  />
                </p>
                <button
                  className="btn btn-primary mr-4"
                  onClick={() => {
                    dispatch({
                      type: sagaTypes.UPDATE_SEAT_SAGA,
                      payload: seatUpdating,
                    });
                    setIsUpdating(false);
                  }}
                >
                  Update information
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsUpdating(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div>
                <p>
                  <b>Seat number:</b> {seatDetail && seatDetail.name}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {seatDetail &&
                    (seatDetail.status ? "Unavailable" : "Available")}
                </p>
                <p>
                  <b>Type:</b> {seatDetail && seatDetail.type}
                </p>
                <p>
                  <b>Price:</b> {seatDetail && seatDetail.price}
                </p>
                <button
                  className="btn btn-primary mr-4"
                  onClick={() => {
                    setIsUpdating(true);
                    setSeatUpdating({
                      id: seatDetail ? seatDetail.id : "",
                      name: seatDetail ? seatDetail.name : "",
                      status: seatDetail ? seatDetail.status : "",
                      type: seatDetail ? seatDetail.type : "",
                      price: seatDetail ? seatDetail.price : "",
                      showtimeId: sid,
                    });
                  }}
                >
                  Update
                </button>
                {!isBooking && (
                  <button className="btn btn-success" onClick={bookTicket}>
                    Book ticket
                  </button>
                )}

                {isBooking && (
                  <div>
                    <hr />
                    Booking user: &nbsp;
                    <select onChange={(e) => setUserBooking(e.target.value)}>
                      <option disabled selected>
                        Choose a user
                      </option>
                      {userList.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn btn-success mr-4 mt-4"
                      onClick={bookTicketFinal}
                    >
                      Book ticket
                    </button>
                    <button
                      className="btn btn-secondary mt-4"
                      onClick={() => setIsBooking(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Seat;
