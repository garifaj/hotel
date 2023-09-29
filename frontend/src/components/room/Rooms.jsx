import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../room/Rooms.module.css";

const Rooms = () => {
  const [rooms, setRooms] = useState(null);
  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/rooms/edit/" + id);
  };
  const Removefunction = (id) => {
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
          <h2>Rooms table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
            <Link to="create" id="#createbutton" className="btn btn-success">
              Add New +
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
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
                    <td>{item.roomNumber}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.image}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-sm btn-success ms-2"
                      >
                        Edit
                      </a>
                      <a
                        onClick={(id) => {
                          Removefunction(item.id);
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
  );
};

export default Rooms;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../components/Rooms.css";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import EditRoom from "./EditRoom";
// import CreateRoom from "./CreateRoom";

// const Rooms = () => {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       const response = await axios.get("https://localhost:7183/api/room");
//       setRooms(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this room?") == true) {
//       alert(id);
//     }
//   };

//   const handleRoomCreate = (createdRoom) => {
//     // Handle the created room in the parent component
//     // This function will be passed as the onRoomCreate prop

//     // Example logic:
//     setRooms([...rooms, createdRoom]);
//   };

//   if (rooms.length === 0) {
//     return <div>Loading...</div>; // Render a loading indicator if rooms are still being fetched
//   }

//   return (
//     <>
//       <h2>Room managment</h2>
//       <CreateRoom onRoomCreate={handleRoomCreate} />

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">Room Nr.</th>
//             <th scope="col">Description</th>
//             <th scope="col">Price</th>
//             <th scope="col">Image</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room.id}>
//               <td>{room.roomNumber}</td>
//               <td>{room.description}</td>
//               <td>{room.price}</td>
//               <td>{room.image}</td>
//               <td>
//                 <EditRoom />
//                 <button
//                   className="btn btn-sm btn-danger ms-2"
//                   onClick={() => handleDelete(room.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default Rooms;
