import React, { useEffect, useState } from "react";
import axios from "axios";

import MyBookingCard from "./MyBookingCard";

const MyBookings = (props) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch all bookings
    axios
      .get("http://localhost:8000/api/bookings")
      .then((response) => {
        // Filter bookings by userId
        const userBookings = response.data.filter(
          (booking) => booking.userId === props.id
        );
        setBookings(userBookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, [props.id]);

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
        <div className="container">
          <h6>You have no bookings.</h6>
        </div>
      )}
    </>
  );
};

export default MyBookings;
