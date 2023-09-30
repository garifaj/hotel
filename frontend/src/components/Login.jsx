import React, { useState } from "react";
import styles from "../components/Login.module.css";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add state for error message
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      // Handle the case where the login failed
      const responseData = await response.json();
      const errorMessage = responseData.message;
      setError(errorMessage); // Set the error message
      return;
    }

    const content = await response.json();
    navigate("/");
    props.setName(content.name);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={`text-center mt-4 ${styles.name}`}>Welcome</div>
        <form className="p-3 mt-3" onSubmit={submit}>
          {error && <div className="text-danger mb-3 ">{error}</div>}
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
            Login
          </button>
        </form>
        <div className="text-start ms-3 fs-6">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
