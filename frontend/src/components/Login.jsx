import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
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

    const data = await response.json();
    setUser({ id: data.id, name: data.name, isAdmin: data.isAdmin });
    navigate("/");
  };

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="d-flex align-items-center justify-content-center  mt-5 pt-5 ">
                <form style={{ width: "23rem" }} onSubmit={submit}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    Sign in
                  </h3>
                  {error && <div className="text-danger mb-3 ">{error}</div>}

                  <div className="form-outline mb-3">
                    <input
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      id="form2Example18"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label pt-1" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      id="form2Example28"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label pt-1" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  <div className="pt-3 mb-4">
                    <button
                      className="btn btn-lg w-100"
                      style={{ backgroundColor: "#009dff", color: "white" }}
                      type="submit"
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#007ecc")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#009dff")
                      }
                    >
                      Login
                    </button>
                  </div>

                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="link-info"
                      style={{ textDecoration: "none" }}
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="http://localhost:8000/Photos/login3.png"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", filter: "brightness(0.95)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
