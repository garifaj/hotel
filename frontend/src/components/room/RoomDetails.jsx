import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../room/RoomDetails.module.css";
import Footer from "../Footer";

const RoomDetails = () => {
  const [room, setRoom] = useState(null);
  const { roomid } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/room/" + roomid
      );
      setRoom(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [roomid]);

  // if (!room) {
  //   return "";
  // }
  return (
    <>
      {room ? (
        <section className={styles.roomdetails}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className={styles.title}>
                    <h2>{room.title}</h2>
                  </div>
                  <div className={styles.image}>
                    <img
                      className={styles.room_img}
                      src={`http://localhost:8000/Photos/${room.image}`}
                      alt=""
                    />
                  </div>
                  <div className={styles.info}>
                    <p>
                      <span>Room number: </span>
                      {room.roomNumber}
                    </p>
                    <p>
                      <span>Price: </span>${room.price}
                    </p>
                    <div className={styles.description}>
                      <span>About this room: </span>
                      <p
                        dangerouslySetInnerHTML={{ __html: room.description }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <h1>Booking form</h1>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <p>Loading...</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default RoomDetails;
