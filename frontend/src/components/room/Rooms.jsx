import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../room/Rooms.module.css";

const Rooms = () => {
  const [rooms, setRooms] = useState(null);
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
                {rooms &&
                  rooms.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.roomNumber}</td>

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

                      <td>{item.price} $</td>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
