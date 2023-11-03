import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../booking/MyBookings.module.css";

import BookingDates from "./BookingDates";

const MyBookings = (props) => {
  const [bookings, setBookings] = useState([]);

  const removeFunction = (id) => {
    if (window.confirm("Do you want to delete this room?")) {
      fetch("http://localhost:8000/api/bookings/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

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
              <div className="card rounded-5 overflow-hidden bg-light-subtle mb-3 mt-2 ">
                <div className="row g-0">
                  <div className=" col-sm-12 col-md-4 col-lg-4 ">
                    <img
                      className={styles.room_img}
                      src={`http://localhost:8000/Photos/${booking.roomImage}`}
                      alt=""
                    />
                  </div>
                  <div
                    className={`col-sm-12 col-md-8 col-lg-8 mb-3 ${styles.custom_width}`}
                  >
                    <div className={styles.title}>
                      <h4>{booking.roomTitle}</h4>
                    </div>
                    <BookingDates booking={booking} />

                    <div className={styles.price}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-cash-coin"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                          />
                          <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                          <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                          <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                        </svg>
                      </div>

                      <div>
                        <p>Total price: {booking.price} $</p>
                      </div>
                    </div>
                    <div className={styles.cancel}>
                      <a
                        onClick={(id) => {
                          removeFunction(booking.id);
                        }}
                        className="btn btn-md btn-danger rounded-5  "
                      >
                        Cancel reservation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </li>
      ) : (
        <div className="container">
          <p>You have no bookings.</p>
        </div>
      )}
    </>
  );
};

export default MyBookings;
