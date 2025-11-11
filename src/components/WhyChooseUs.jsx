import React from "react";
import { motion } from "framer-motion";

import img1 from "../assets/asset2.jpg";
import img2 from "../assets/asset4.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-base-200 text-accent">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 gap-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full lg:w-1/2 h-[450px] md:h-[550px] flex justify-center items-center 
                     "
        >
          <motion.img
            variants={fadeInUp}
            src={img1}
            alt="Professional Worker"
            className="absolute top-0 left-0 w-3/4 h-[350px] md:h-[450px]  shadow-xl object-cover z-20"
          />

          <motion.img
            variants={fadeInUp}
            src={img2}
            alt="Handyman Service"
            className="absolute bottom-0 right-0 w-2/3 md:w-3/5 h-[300px] md:h-[400px] shadow-2xl object-cover z-30"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full lg:w-1/2 text-left"
        >
          <motion.p
            variants={fadeInUp}
            className="uppercase tracking-widest text-xs font-semibold mb-2 text-gray-500"
          >
            Why Choose Us
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
          >
            We make handyman service for your home
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-gray-600 leading-relaxed mb-6 max-w-lg"
          >
            Your Home, Handled. The Trusted Solution for Home Maintenance and
            Repair We simplify home maintenance with transparent pricing,
            guaranteed quality, and a team of professional, background-checked
            experts ready to tackle any project, big or small.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-4 mb-8 text-gray-800"
          >
            <div className="flex items-center gap-2">
              <span className="text-secondary text-xl">✔</span> Professional
              Worker
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary    text-xl">✔</span> Trusted
              Company
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary text-xl">✔</span> Best Quality
              Materials
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary text-xl">✔</span> Affordable Price
            </div>
          </motion.div>

          <motion.button
            variants={fadeInUp}
            className="px-8 py-3 bg-secondary font-semibold rounded-lg shadow-lg hover:bg-primary hover:text-blue-500 transition"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
