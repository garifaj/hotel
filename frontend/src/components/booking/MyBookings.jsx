import React, { useEffect, useState } from "react";
import axios from "axios";

import MyBookingCard from "./MyBookingCard";

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch all bookings
    axios
      .get("http://localhost:8000/api/bookings")
      .then((response) => {
        // Filter bookings by userId
        const userBookings = response.data.filter(
          (booking) => booking.userId === user.id
        );
        setBookings(userBookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, [user.id]);

  return (
    <>
      {bookings.length > 0 ? (
        <li style={{ listStyle: "none" }}>
          {bookings.map((booking) => (
            <div className="container" key={booking.id}>
              <MyBookingCard booking={booking} />
            </div>
          ))}
        </li>
      ) : (
        <div
          className="container"
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          <h6 style={{ color: "#1f1f1f", fontSize: "18px" }}>
            You have no bookings yet. Start exploring and book your favorite
            rooms!
          </h6>
        </div>
      )}
    </>
  );
};

export default MyBookings;
