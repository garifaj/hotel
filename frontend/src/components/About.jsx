import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div>
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
    </div>
  );
};

export default About;
