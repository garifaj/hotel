import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.about_area}>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className={styles.about_info}>
                <div className={styles.section_title}>
                  <span>About Us</span>
                  <h3>
                    A Luxuries Hotel <br />
                    with Nature
                  </h3>
                </div>
                <p>
                  Welcome to [Your Hotel Name], where timeless elegance meets
                  modern comfort. Nestled in the heart of [Your Location], our
                  dedicated team is committed to ensuring your stay is
                  exceptional. Whether for business, leisure, or a special
                  occasion, our inviting ambiance, impeccable service, and fine
                  dining await you. Experience hospitality at its finest with
                  us, where every moment is crafted to create cherished memories
                  that will last a lifetime.
                </p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className={`${styles.about_thumb} d-flex`}>
                <div className={styles.img_1}>
                  <img src="http://localhost:8000/Photos/about_1.png" alt="" />
                </div>
                <div className={styles.img_2}>
                  <img src="http://localhost:8000/Photos/about_2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.services}>
        <div className="container">
          <div className={styles.services_title}>
            <span>What we do</span>
            <h3>Discover our services</h3>
          </div>

          <div className={styles.cards}>
            <div>
              <img
                src="http://localhost:8000/Photos/cocktail-svgrepo-com.svg"
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <h4>Bar & drinks</h4>
              <p>
                Socialize in style at our well-stocked bar, offering handcrafted
                cocktails and a memorable setting for your evenings
              </p>
            </div>
            <div>
              <img
                src="http://localhost:8000/Photos/bed-double-svgrepo-com.svg"
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <h4>Cozy rooms</h4>
              <p>
                Experience ultimate comfort in our cozy rooms, where inviting
                spaces provide the perfect retreat for a restful stay.
              </p>
            </div>
            <div>
              <img
                src="http://localhost:8000/Photos/parking-car-svgrepo-com.svg"
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <h4>Parking</h4>
              <p>
                Enjoy worry-free travels with our secure and accessible parking
                facilities, ensuring peace of mind during your stay.
              </p>
            </div>
            <div>
              <img
                src="http://localhost:8000/Photos/room-service-2-svgrepo-com.svg"
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <h4>Room service</h4>
              <p>
                Indulge in the convenience of room service, offering delectable
                dining and refreshing beverages right at your doorstep, ensuring
                an exceptional stay.
              </p>
            </div>
          </div>
          {/* <img
            src="http://localhost:8000/Photos/cocktail-svgrepo-com.svg"
            alt=""
            style={{ height: "50px", width: "50px" }}
          />
          <img
            src="http://localhost:8000/Photos/bed-double-svgrepo-com.svg"
            alt=""
            style={{ height: "50px", width: "50px" }}
          />
          <img
            src="http://localhost:8000/Photos/parking-car-svgrepo-com.svg"
            alt=""
            style={{ height: "50px", width: "50px" }}
          />
          <img
            src="http://localhost:8000/Photos/wifi-1020-svgrepo-com.svg"
            alt=""
            style={{ height: "50px", width: "50px" }}
          /> */}
        </div>
      </section>
    </>
  );
};

export default About;
