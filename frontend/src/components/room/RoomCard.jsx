import React, { useState } from "react";
import styles from "../room/RoomCard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const RoomCard = () => {
  const [rooms, setRooms] = useState(null);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/room");
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <section className={styles.roomcard}>
        <div className="container">
          <div className={styles.roomcard_title}>
            <span>Rooms</span>
            <h3>Our rooms</h3>
          </div>
          <div className="row">
            {rooms &&
              rooms.map((room) => (
                <div className="cols-sm col-md-6 col-lg-4 ftco-animate fadeInUp ftco-animated">
                  <div className={styles.room}>
                    <Link
                      to={"/"}
                      className={`${styles.img} d-flex justify-content-center align-items-center`}
                    >
                      <img
                        className={styles.room_img}
                        src={`http://localhost:8000/Photos/${room.image}`}
                        alt=""
                      />
                    </Link>
                    <div className={`${styles.text} p-3 text-center`}>
                      <h3 className="mb-3 mt-2">
                        <Link to={"/"}>{room.title}</Link>
                      </h3>
                      <p>
                        <span className={`${styles.price} mr-2`}>
                          ${room.price.toFixed(2)}
                        </span>
                        {"  "}
                        <span className={styles.per}> per night</span>
                      </p>
                      <hr />
                      <p className="pt-1">
                        <Link to={"/"} className={styles.btn_custom}>
                          View Room Details{" "}
                          <span className="icon-long-arrow-right"></span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomCard;
