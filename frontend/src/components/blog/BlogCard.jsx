import React, { useState } from "react";
import styles from "./BlogCard.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../Loading";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => b.id - a.id);

  return (
    <>
      <section className={styles.blogcard}>
        <div className="container">
          <div className={styles.blogcard_title}>
            <span>Blogs</span>
            <h3>Our blogs</h3>
          </div>
          <div className="row flex-nowrap overflow-auto">
            {loading ? (
              <Loading />
            ) : (
              sortedBlogs.map((blog) => (
                <div
                  className={`col-sm-8 col-md-6 col-lg-4 ftco-animate fadeInUp ftco-animated ${styles.custom_width}`}
                  key={blog.id}
                >
                  <div className={styles.blog}>
                    <Link
                      to={"/blogs/details/" + blog.id}
                      className={`${styles.img} d-flex justify-content-center align-items-center`}
                    >
                      <img
                        className={styles.blog_img}
                        src={`http://localhost:8000/Photos/${blog.image}`}
                        alt=""
                      />
                    </Link>
                    <div className={`${styles.text} p-3 `}>
                      <h3 className="mb-3 mt-2">
                        <Link to={"/blogs/details/" + blog.id}>
                          {blog.title}
                        </Link>
                      </h3>
                      <p>{blog.summary}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogCard;
