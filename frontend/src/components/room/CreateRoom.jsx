import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../room/CreateRoom.module.css";

const CreateRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const roomdata = { roomNumber, description, price, image };

    fetch("http://localhost:8000/api/room/", {
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

    fetch("http://localhost:8000/api/" + "room/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  };
  return (
    <>
      <div className={styles.container_room}>
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
                      <div className={styles.form_group}>
                        <label>Room Number</label>
                        <input
                          type="number"
                          placeholder="Enter number"
                          value={roomNumber}
                          onChange={(e) => setRoomNumber(e.target.value)}
                          className="form-control "
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
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
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div
                        className={styles.form_group}
                        style={{ float: "right" }}
                      >
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
    </>
  );
};

export default CreateRoom;
