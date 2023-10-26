import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BlogDetails.module.css";
import Footer from "../Footer";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState(null);
  const { blogid } = useParams();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/blogs/" + blogid
      );
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [blogid]);
  return (
    <>
      {blogs ? (
        <section className={styles.blogsection}>
          <div className="container">
            <div className={styles.title}>
              <h2>{blogs.title}</h2>
            </div>

            <div className={styles.image}>
              <img
                src={`http://localhost:8000/Photos/${blogs.image}`}
                alt="Blogs image"
              />
            </div>
            <div className={styles.content}>
              <p dangerouslySetInnerHTML={{ __html: blogs.content }}></p>
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <p>Loading...</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BlogDetails;
