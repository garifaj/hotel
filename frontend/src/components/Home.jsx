import React from "react";
import ImageSlider from "./ImageSlider";
import About from "./About";
import RoomCard from "./room/RoomCard";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <About />
      <RoomCard />
    </div>
  );
};

export default Home;
