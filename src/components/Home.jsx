import React from "react";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";
import HomeServices from "./HomeServices";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <WhyChooseUs></WhyChooseUs>
      <HomeServices></HomeServices>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
