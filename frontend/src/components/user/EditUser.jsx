import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../user/EditUser.module.css";

const EditUser = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/users/" + userid)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    const userdata = { id, name, email, isAdmin };

    fetch("http://localhost:8000/api/users/" + userid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userdata),
    })
      .then((res) => {
        alert("Edited user successfully.");
        navigate("/users");
      })
      .catch((err) => {
        console.log(err.message);
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
                  <h2 style={{ textAlign: "center" }}>Edit user</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>ID</label>
                        <input
                          value={id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Email</label>
                        <input
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div
                        className="form-check"
                        style={{ marginTop: "0.5rem" }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                        ></input>
                        <label className="form-check-label">Admin</label>
                      </div>
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
                        <Link to="/users" className="btn btn-danger">
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

export default EditUser;
