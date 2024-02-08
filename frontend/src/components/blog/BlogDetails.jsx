import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BlogDetails.module.css";
import Footer from "../Footer";
import Loading from "../Loading";

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
              <p className={styles.author}>
                <svg
                  fill="#000000"
                  width="27px"
                  height="27px"
                  viewBox="0 -0.08 20 20"
                  data-name="Capa 1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M12.41,9.06a3,3,0,1,0-4.82,0,6.55,6.55,0,0,0-3.74,6,.38.38,0,1,0,.75,0A5.6,5.6,0,0,1,10,9.29a5.6,5.6,0,0,1,5.4,5.77.38.38,0,1,0,.75,0A6.55,6.55,0,0,0,12.41,9.06ZM8.32,8.79a2.21,2.21,0,1,1,3.89-1.43,2.16,2.16,0,0,1-.5,1.4l0,0a5.8,5.8,0,0,0-3.37,0Z"></path>
                  </g>
                </svg>
                {blogs.author}
              </p>
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
        <Loading />
      )}
      <Footer />
    </>
  );
};

export default BlogDetails;
