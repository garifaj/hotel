import React from "react";
import styles from "../booking/BookingWidget.module.css";
import { Link } from "react-router-dom";

const DisabledBooking = () => {
  return (
    
      <form>
        <fieldset disabled>
          <div className="card" style={{ textAlign: "left" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className={styles.form_group}>
                    <label>Check in</label>
                    <input type="date" className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={styles.form_group}>
                    <label>Check out</label>
                    <input type="date" className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={styles.form_group}>
                    <label>Full name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="form-control "
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={styles.form_group}>
                    <label>Phone number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    className="btn"
                    type="submit"
                    style={{ background: "#009dff", color: "#fff" }}
                  >
                    Book this place
                  </button>
                </div>
              </div>
            </div>
            <div className="text-start ms-3 fs-6 mb-2">
              Do you want to book this room?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#009dff" }}
              >
                Login
              </Link>
            </div>
          </div>
        </fieldset>
      </form>

  );
};

export default DisabledBooking;
