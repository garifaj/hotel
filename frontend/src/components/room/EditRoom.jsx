import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../room/EditRoom.module.css";

import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";

const EditRoom = () => {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/room/" + roomid);
      const data = await response.json();
      setId(data.id);
      setTitle(data.title);
      setRoomNumber(data.roomNumber);
      setDescription(data.description);
      setPrice(data.price);
      setImage(data.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const roomdata = { id, title, roomNumber, description, price, image };

    fetch("http://localhost:8000/api/room/" + roomid, {
      method: "PUT",
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

    fetch("http://localhost:8000/api/room/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((error) => {
        console.error("Image Upload Error:", error);
      });
  };

  return (
    <div>
      <div className={styles.container_room}>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2 style={{ textAlign: "center" }}>Edit room</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>ID</label>
                        <input
                          value={id}
                          className="form-control"
                          disabled
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Title</label>
                        <input
                          type="text"
                          placeholder="Enter room title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
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
                      <div className={styles.form_group}>
                        <label>Description</label>
                        <Editor onChange={setDescription} value={description} />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
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
                      <div className={styles.form_group}>
                        <label>Image</label>
                        <input
                          type="file"
                          size="sm"
                          onChange={imageUpload}
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ marginTop: "0.5rem" }}>
                      {image && (
                        <img
                          src={`http://localhost:8000/Photos/${image}`}
                          alt="Room Image"
                        />
                      )}
                    </div>

                    <div className="col-lg-12">
                      <div
                        className={styles.form_group}
                        style={{ float: "right" }}
                      >
                        <button className="btn btn-success" type="submit">
                          Update
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

export default EditRoom;
