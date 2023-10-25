import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateBlog.module.css";
import "react-quill/dist/quill.snow.css";
import Editor from "../room/Editor";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const blogdata = { title, content, summary, image };

    fetch("http://localhost:8000/api/blogs/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(blogdata),
    })
      .then(() => {
        alert("Saved successfully.");
        navigate("/blogs");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch("http://localhost:8000/api/" + "blogs/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  };
  return (
    <>
      <div className={styles.container_room}>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2 style={{ textAlign: "center" }}>Add new blog</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Title</label>
                        <input
                          type="text"
                          placeholder="Enter blog title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Summary</label>
                        <textarea
                          placeholder="Summary"
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          className="form-control"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Content</label>
                        <Editor onChange={setContent} value={content} />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>Image</label>
                        <input
                          type="file"
                          size="sm"
                          onChange={imageUpload}
                          className="form-control"
                          required
                        ></input>
                      </div>
                      <div
                        className="col-lg-12"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {image && (
                          <img
                            src={`http://localhost:8000/Photos/${image}`}
                            alt="Room Image" // You can define a CSS class for styling if needed
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div
                        className={styles.form_group}
                        style={{ float: "right" }}
                      >
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        &nbsp;
                        <Link to="/blogs" className="btn btn-danger">
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
    </>
  );
};

export default CreateBlog;
