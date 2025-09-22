"use client";

import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  name?: string;
  tagline?: string;
}

const HeroSection = ({
  name = "GATTA VENKATA SIVA",
  tagline = "I transform raw data into actionable insights that drive business decisions.",
}: HeroSectionProps) => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-white dark:bg-black overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-teal-400 animate-gradient-slow" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-teal-400">
                {name}
              </span>
              ,
              <br /> a DATA ANALYST.
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {tagline}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={scrollToPortfolio}
                className="bg-gradient-to-r from-pink-500 to-teal-400 hover:from-pink-600 hover:to-teal-500 text-white px-8 py-6 text-lg"
              >
                View My Work
              </Button>
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="border-2 border-gray-300 dark:border-gray-700 hover:border-pink-500 hover:text-pink-500 dark:hover:border-teal-400 dark:hover:text-teal-400 px-8 py-6 text-lg"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
                <img
                  src="https://i.postimg.cc/qJkW1xgK/profile-pic.jpg"
                  alt="Gatta Venkata Siva"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-gradient-to-r from-pink-500 to-teal-400 opacity-20 animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-500/20"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default HeroSection;