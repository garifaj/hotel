import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditBlog.module.css";

import "react-quill/dist/quill.snow.css";
import Editor from "../room/Editor";

const EditBlog = () => {
  const { blogid } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/blogs/" + blogid);
      const data = await response.json();
      setId(data.id);
      setTitle(data.title);
      setAuthor(data.author);
      setContent(data.content);
      setSummary(data.summary);
      setImage(data.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogdata = { id, title, author, content, summary, image };

    fetch("http://localhost:8000/api/blogs/" + blogid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(blogdata),
    })
      .then((res) => {
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

    fetch("http://localhost:8000/api/blogs/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((error) => {
        console.error("Image Upload Error:", error);
      });
  };

  return (
    <>
      <div className={styles.container_room}>
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2 style={{ textAlign: "center" }}>Edit blog</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className={styles.form_group}>
                        <label>ID</label>
                        <input
                          value={id}
                          className="form-control"
                          disabled
                        ></input>
                      </div>
                    </div>
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
                        <label>Author</label>
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
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
                          Update
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

export default EditBlog;
