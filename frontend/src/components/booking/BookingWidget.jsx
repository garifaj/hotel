import React, { useEffect, useState } from "react";
import styles from "../booking/BookingWidget.module.css";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import DisabledBooking from "./DisabledBooking";

const BookingWidget = (props) => {
  const { user, room } = props;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const isBookingDisabled = !user.name;

  const navigate = useNavigate();

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setError("Checkout date must be after the check-in date.");
      return;
    }
    const bookingData = {
      checkIn,
      checkOut,
      fullName,
      phone,
      roomId: room.id,
      roomImage: room.image,
      roomTitle: room.title,
      price: numberOfNights * room.price,
    };

    const response = await fetch("http://localhost:8000/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingData),
      credentials: "include",
    });
    if (!response.ok) {
      const data = await response.json();
      const errorMessage = data.message;
      setError(errorMessage); // Set the error message
      return;
    }
    alert("Booking made successfully");
    navigate("/mybookings");
  };

  useEffect(() => {
    if (user.name) {
      setFullName(user.name);
    }
  }, [user.name]);

  return (
    <>
      <div className={styles.text}>
        <h4>Price: ${room.price} / per night</h4>
      </div>
      {isBookingDisabled ? (
        <>
          <DisabledBooking />
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className="text-danger mb-2 text-center"
              style={{ fontSize: "14px" }}
            >
              {error}
            </div>
          )}
          <div className="card" style={{ textAlign: "left" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <div className={styles.form_group}>
                    <label>Check in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="form-control"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <div className={styles.form_group}>
                    <label>Check out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="form-control"
                      required
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={styles.form_group}>
                    <label>Full name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter name"
                      className="form-control "
                      required
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={styles.form_group}>
                    <label>Phone number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      required
                    ></input>
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    className="btn "
                    type="submit"
                    style={{ background: "#009dff", color: "#fff" }}
                  >
                    Book this place
                    {numberOfNights > 0 && (
                      <span className={styles.span}>
                        {" "}
                        ${numberOfNights * room.price}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default BookingWidget;
