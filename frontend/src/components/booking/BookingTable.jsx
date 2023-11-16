import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../booking/BookingTable.module.css";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(7);

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
    fetchBookings();
  }, []);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings =
    bookings && bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchBookings = async () => {
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
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentBookings &&
                  currentBookings.map((item) => (
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
                      <td>
                        <a
                          onClick={(id) => {
                            removeFunction(item.id);
                          }}
                          className="btn btn-sm btn-danger ms-2"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7">
                    {Math.ceil(bookings.length / bookingsPerPage) > 1 && (
                      <ul className="pagination justify-content-center ">
                        {[
                          ...Array(
                            Math.ceil(bookings.length / bookingsPerPage)
                          ).keys(),
                        ].map((number) => (
                          <li key={number + 1} className="page-item">
                            <a
                              onClick={() => paginate(number + 1)}
                              className="page-link"
                            >
                              {number + 1}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
