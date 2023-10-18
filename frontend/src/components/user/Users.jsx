import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../user/Users.module.css";

const Users = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  const loadEdit = (id) => {
    navigate("/users/edit/" + id);
  };
  const removeFunction = (id) => {
    if (window.confirm("Do you want to delete this room?")) {
      fetch("http://localhost:8000/api/users/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container_room}>
      <div className="card">
        <div className="card-title">
          <h2 style={{ textAlign: "center" }}>Users table</h2>
        </div>
        <div className="card-body">
          <div className={styles.divbtn}>
            <Link to="create" id="#createbutton" className="btn btn-success">
              Add New +
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Admin</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        <a
                          onClick={() => {
                            loadEdit(item.id);
                          }}
                          className="btn btn-sm btn-success ms-2"
                        >
                          Edit
                        </a>
                        <a
                          onClick={(id) => {
                            removeFunction(item.id);
                          }}
                          className="btn btn-sm btn-danger ms-2"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
