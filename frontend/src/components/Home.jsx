import React from "react";
import ImageSlider from "./ImageSlider";
import About from "./About";
import RoomCard from "./room/RoomCard";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <About />
      <RoomCard />
      <Footer />
    </div>
  );
};

export default Home;
