import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../booking/BookingTable.module.css";

const BookingTable = () => {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container_room}>
      <div className="card">
        <div className="card-title">
          <h2 style={{ textAlign: "center" }}>Bookings table</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>Booking ID</td>
                  <td>User ID</td>
                  <td>User name</td>
                  <td>Phone</td>
                  <td>Room ID</td>
                  <td>Room title</td>
                  <td>Check in / Check out</td>
                  <td>Total price</td>
                </tr>
              </thead>
              <tbody>
                {bookings &&
                  bookings.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.userId}</td>
                      <td>{item.fullName}</td>

                      <td>
                        <div>{item.phone}</div>
                      </td>

                      <td>{item.roomId}</td>
                      <td>{item.roomTitle}</td>
                      <td>
                        {new Date(item.checkIn).toLocaleDateString()} {"-> "}
                        {new Date(item.checkOut).toLocaleDateString()}
                      </td>
                      <td>{item.price.toFixed(2)} $</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
