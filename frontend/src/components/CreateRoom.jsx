import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const roomdata = { roomNumber, description, price, image };

    fetch("https://localhost:7183/api/room/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(roomdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/rooms");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch("https://localhost:7183/api/" + "room/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  };
  return (
    <div>
      <div className="container-room">
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2 style={{ textAlign: "center" }}>Add new room</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Room Number</label>
                        <input
                          type="number"
                          placeholder="Enter number"
                          value={roomNumber}
                          onChange={(e) => setRoomNumber(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          rows={6}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="number"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          size="sm"
                          onChange={imageUpload}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group" style={{ float: "right" }}>
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        &nbsp;
                        <Link to="/rooms" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import axios from "axios";

// const CreateRoom = ({ onRoomCreate }) => {
//   const [show, setShow] = useState(false);
//   const [newRoom, setNewRoom] = useState({
//     roomNumber: "",
//     description: "",
//     price: "",
//     images: [],
//   });

//   const handleClose = () => {
//     setShow(false);
//     setNewRoom({
//       roomNumber: "",
//       description: "",
//       price: "",
//       images: [],
//     });
//   };

//   const handleInputChange = (e) => {
//     if (e.target.name === "images") {
//       setNewRoom({ ...newRoom, images: e.target.files });
//     } else {
//       setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
//     }
//   };

//   const handleRoomCreate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", newRoom.images[0]);

//       const response = await axios.post(
//         "https://localhost:7183/api/room/SaveFile",
//         formData
//       );

//       const createdRoom = {
//         roomNumber: newRoom.roomNumber,
//         description: newRoom.description,
//         price: newRoom.price,
//         image: response.data,
//       };

//       await axios.post("https://localhost:7183/api/room", createdRoom);

//       onRoomCreate(createdRoom);
//       handleClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <button
//         className="btn btn-sm btn-primary"
//         id="createbutton"
//         onClick={() => setShow(true)}
//       >
//         Create
//       </button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formRoomNumber">
//               <Form.Label>Room number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter number"
//                 name="roomNumber"
//                 value={newRoom.roomNumber}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={6}
//                 name="description"
//                 value={newRoom.description}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Price"
//                 name="price"
//                 value={newRoom.price}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formImage" className="mb-3">
//               <Form.Label>Images</Form.Label>
//               <Form.Control
//                 type="file"
//                 size="sm"
//                 name="images"
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleRoomCreate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default CreateRoom;

//
//
// const CreateRoom = () => {
//   const PHOTO_URL = "https://localhost:7183/Photos";
//   const API_URL = "https://localhost:7183/api/";
//   const [show, setShow] = useState(false);

//   const [roomNumber, setRoomNumber] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");

//   // const [newRoom, setNewRoom] = useState({
//   //   roomNumber: "",
//   //   description: "",
//   //   price: "",
//   //   images: "hotelroom.jpg",
//   //   photoPath: PHOTO_URL,
//   // });
//   const imageUpload = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("file", e.target.files[0], e.target.files[0].name);

//     fetch(API_URL + "room/savefile", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         this.setState({ image: data });
//       });
//   };

//   const handleSave = () => {
//     const url = "https://localhost:7183/api/room";
//     const data = {
//       "roomNumber": roomNumber,
//       "description": description,
//       "price": price,
//       "image": image
//     }
//     axios.post(url, data)
//     .then((result) => {
//       get
//     })
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <>
//       <button
//         className="btn btn-sm btn-primary"
//         id="createbutton"
//         onClick={() => handleShow()}
//       >
//         Create
//       </button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formRoomNumber">
//               <Form.Label>Room number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter number"
//                 value={roomNumber}
//                 onChange={(e) => setRoomNumber(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={6}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formImage" className="mb-3">
//               <Form.Label>Images</Form.Label>
//               <Form.Control type="file" size="sm" onChange={imageUpload} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default CreateRoom;
