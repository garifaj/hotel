import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../room/Rooms.module.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(4);
  const navigate = useNavigate();

  const loadEdit = (id) => {
    navigate("/rooms/edit/" + id);
  };
  const removeFunction = (id) => {
    if (window.confirm("Do you want to delete this room?")) {
      fetch("http://localhost:8000/api/room/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/room");
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms && rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={styles.container_room}>
      <div className="card">
        <div className="card-title">
          <h2 style={{ textAlign: "center" }}>Rooms table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
            <Link to="create" id="#createbutton" className="btn btn-success">
              Add New +
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table align-middle table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Room number</td>
                  <td>Description</td>
                  <td>Price</td>
                  <td>Image</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentRooms &&
                  currentRooms.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td style={{ textAlign: "center" }}>{item.roomNumber}</td>

                      <td>
                        <div
                          style={{
                            maxWidth: "40rem",
                            maxHeight: "10rem",
                            overflow: "auto",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        ></div>
                      </td>

                      <td>{item.price.toFixed(2)} $</td>
                      <td>{item.image}</td>
                      <td>
                        <a
                          onClick={() => {
                            loadEdit(item.id);
                          }}
                          className="btn btn-sm btn-success ms-2"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
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
                    {Math.ceil(rooms.length / roomsPerPage) > 1 && (
                      <ul className="pagination justify-content-center ">
                        {[
                          ...Array(
                            Math.ceil(rooms.length / roomsPerPage)
                          ).keys(),
                        ].map((number) => (
                          <li key={number + 1} className="page-item ">
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

export default Rooms;
