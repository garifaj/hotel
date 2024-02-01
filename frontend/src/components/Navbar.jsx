import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ user, setUser }) => {
  let authButtons;
  let menu;

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setUser({ id: "", name: "", isAdmin: false });
  };

  if (!user.name) {
    authButtons = (
      <div className="ml-auto d-flex flex-column flex-md-row">
        <Link to="/signup" id={styles.navbtn} className="btn btn-transparent">
          Sign up
        </Link>
        <Link
          to="/login"
          className="btn btn-md ms-1 rounded-4 py-1 px-3"
          style={{
            backgroundColor: "#009dff",
            color: "white",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#007ecc")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#009dff")}
        >
          Login
        </Link>
      </div>
    );
  } else {
    authButtons = (
      <div className="ml-auto d-flex flex-column flex-md-row">
        <ul className="navbar-nav mx-auto mb-2 ">
          <li className="nav-item active">
            <Link
              to="/login"
              className="nav-link"
              onClick={logout}
              id={styles.navbtn}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  if (user.isAdmin) {
    menu = (
      <ul className="navbar-nav mx-auto" style={{ alignItems: "center" }}>
        <li className="nav-item me-3">
          <Link to="/rooms" className="nav-link" id={styles.navbtn}>
            Rooms
          </Link>
        </li>
        <li className="nav-item me-3">
          <Link to="/users" className="nav-link" id={styles.navbtn}>
            Users
          </Link>
        </li>
        <li className="nav-item me-3">
          <Link to="/blogs" className="nav-link" id={styles.navbtn}>
            Blogs
          </Link>
        </li>
        <li className="nav-item me-3">
          <Link to="/allbookings" className="nav-link" id={styles.navbtn}>
            Bookings
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="navbar-nav mx-auto">
        <li className="nav-item me-3">
          <Link to="/mybookings" className="nav-link" id={styles.navbtn}>
            My bookings
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom pb-2">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand mt-1"
          style={{ fontWeight: "400" }}
        >
          Hotel System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  justify-content-center"
          id="navbarNav"
        >
          <div className="mx-auto d-flex flex-column flex-md-row">{menu}</div>

          {authButtons}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
