import React, { useState } from "react";
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
      <section style={{ overflowY: "hidden", maxHeight: "calc(100vh - 61px)" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="d-flex align-items-center justify-content-center  mt-5 pt-5 ">
                <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    Sign up
                  </h3>

                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      required
                      onChange={(e) => setName(e.target.value)}
                      id="form2Example18"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label pt-1" htmlFor="form2Example18">
                      Name
                    </label>
                  </div>
                  <div className="form-outline mb-2">
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

                  <div className="form-outline mb-2">
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
                      Sign up
                    </button>
                  </div>

                  <p>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="link-info"
                      style={{ textDecoration: "none" }}
                    >
                      Login
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
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
