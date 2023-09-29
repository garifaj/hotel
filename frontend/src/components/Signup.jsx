import React, { useState } from "react";
import styles from "../components/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    navigate("/login");
  };

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <div className={`text-center mt-4 ${styles.name}`}>Sign up</div>
          <form className="p-3 mt-3" onSubmit={handleSubmit}>
            <div className={`${styles.form_field} d-flex align-items-center`}>
              <span className={`${styles.fas} fa-user`}></span>
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={`${styles.form_field} d-flex align-items-center`}>
              <span className={`${styles.fas} fa-user`}></span>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={`${styles.form_field} d-flex align-items-center`}>
              <span className={`${styles.fas} fa-key`}></span>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={`${styles.btn} mt-3`} type="submit">
              Sign up
            </button>
          </form>
          <div className="text-start ms-3 fs-6">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
