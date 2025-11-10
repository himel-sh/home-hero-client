import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "framer-motion";

import img1 from "../assets/asset1.jpg";
import img2 from "../assets/asset2.jpg";
import img3 from "../assets/asset3.jpg";
import img4 from "../assets/asset4.jpg";

const images = [img1, img2, img3, img4];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

const swipeConfidenceThreshold = 10000; // higher = more momentum needed

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Slider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full h-[250px] lg:h-[600px] mx-auto overflow-hidden shadow-lg">
      {/* Animated Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 1, ease: "easeInOut" },
            opacity: { duration: 1 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
          className="absolute inset-0 w-full h-full object-cover select-none z-0"
        />
      </AnimatePresence>

      {/* Always-on Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-10"></div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center text-white px-4 sm:px-8 md:px-20 z-20">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-sm sm:text-md md:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2 drop-shadow-md"
        >
          Smart Solutions
        </motion.h1>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
          className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 drop-shadow-lg"
        >
          Expert Solutions For <br className="block" /> Every Home
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="btn btn-primary text-accent font-bold text-sm px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform w-fit"
        >
          Learn More
        </motion.button>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full shadow-md hover:bg-white/60 hover:text-black transition z-30"
        onClick={() => paginate(-1)}
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full shadow-md hover:bg-white/60 hover:text-black transition z-30"
        onClick={() => paginate(1)}
      >
        ❯
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              i === imageIndex ? "bg-white scale-125" : "bg-gray-400/70"
            }`}
            onClick={() => {
              const newDirection = i > imageIndex ? 1 : -1;
              setPage([i, newDirection]);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
