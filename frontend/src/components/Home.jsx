import React from "react";
import ImageSlider from "./ImageSlider";
import About from "./About";
import RoomCard from "./room/RoomCard";
import Footer from "./Footer";
import BlogCard from "./blog/BlogCard";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <About />
      <RoomCard />
      <BlogCard />
      <Footer />
    </div>
  );
};

export default Home;
