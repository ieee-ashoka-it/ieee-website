"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import heroImage from "@/public/images/hero-1.jpg";
import { Media } from "@/components/media";

import {
  Goal,
  CircleHelp,
  Telescope,
  MoveRight as ArrowRight,
} from "lucide-react";
import { Event } from "./events";
import "react-photo-album/masonry.css";
import { Photo } from "./about/actions";

export default function PageWrapper({
  photos,
  events,
}: {
  photos: Photo[];
  events: Event[];
}) {
  const { scrollYProgress } = useScroll();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Modified heroScale to stop at 0.8
  const heroScale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0.92, 0.92]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.2], [0, 28]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const cards = events.map((event, index) => (
    <Card key={event.id} card={event} index={index} />
  ));

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden bg-[#fbfbf8]">
      {/* Hero Section */}
      <motion.section
        id="hero"
        style={{
          scale: heroScale,
          borderRadius: heroBorderRadius,
          opacity: heroOpacity,
        }}
        className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-[#23417c]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#fbfbf8] mb-6">
            IEEE Ashoka
          </h1>
          <p className="text-xl md:text-2xl text-[#fbfbf8] mb-8">
            Building the culture around STEM @ Ashoka!
          </p>
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src={heroImage}
            alt="IEEE Ashoka Background"
            layout="fill"
            objectFit="cover"
            className="filter brightness-50"
          />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <Section>
        <h2 className="text-4xl flex flex-row items-center gap-4 md:text-5xl font-bold mb-12 text-[#302f2f]">
          About IEEE Ashoka{" "}
          <a href="/about">
            <ArrowRight className="w-8 h-8 hover:scale-110 transition-all duration-300" />
          </a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#467eb5] p-6 rounded-[1.75rem] shadow-2xl`}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#fbfbf8] flex items-center gap-2">
              <Goal className="w-8 h-8" />
              Our Mission
            </h3>
            <div className="text-[#fbfbf8] text-lg">
              Our mission is to help students acquire lasting skills that set
              them apart for prestigious positions in business and academics by
              providing a variety of service programmes and leadership training.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#f186c1] p-6 rounded-[1.75rem] shadow-2xl`}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#fbfbf8] flex items-center gap-2">
              <CircleHelp className="w-8 h-8" />
              What We Do
            </h3>
            <div className="text-[#fbfbf8] text-lg">
              At Ashoka University, our society presents a unique opportunity to
              cater to a student community from various academic backgrounds.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-[#d47557] p-6 rounded-[1.75rem] shadow-2xl`}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#fbfbf8] flex items-center gap-2">
              <Telescope className="w-8 h-8" />
              Our Vision
            </h3>
            <div className="text-[#fbfbf8] text-lg">
              To establish IEEE Ashoka as an IEEE chapter to promote STEM at by
              setting up clubs under IEEE Ashoka Student Chapters for
              hyperfocused communities.
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Events Preview Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container w-full mx-auto h-full py-10"
      >
        <h2 className="max-w-7xl flex flex-row items-center gap-4 px-4 text-4xl md:text-5xl font-bold text-[#302f2f]">
          Our Events{" "}
          <a href="/events">
            <ArrowRight className="w-8 h-8 hover:scale-110 transition-all duration-300" />
          </a>
        </h2>
        <Carousel items={cards} />
      </motion.div>

      {/* Photos Section */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full py-10 bg-[#fbfbf8] relative`}
      >
        <div className="container mx-auto px-4 relative">
          <div className="absolute top-0 left-0 w-[10rem] h-[10rem] md:w-[30rem] md:h-[30rem] bg-[#467eb5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-[10rem] h-[10rem] md:w-[30rem] md:h-[30rem] bg-[#f186c1] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-16 left-1/2 w-[10rem] h-[10rem] md:w-[30rem] md:h-[30rem] bg-[#d47557] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <h2 className="text-4xl flex flex-row items-center gap-4 md:text-5xl font-bold mb-12 pt-12 text-[#302f2f] relative z-10">
            Photo Gallery
            <a href="/about#gallery">
              <ArrowRight className="w-8 h-8 hover:scale-110 transition-all duration-300" />
            </a>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            {photos?.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-[1.75rem] shadow-2xl group"
              >
                <Image
                  src={photo.image_url}
                  alt={photo.caption}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex items-end p-3 justify-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[#fbfbf8] text-center font-semibold px-4 py-2 text-md md:text-2xl">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Media />
    </main>
  );
}

const Section = ({
  children,
  bgColor = "#fbfbf8",
  gradient = false,
}: {
  children: React.ReactNode;
  bgColor?: string;
  gradient?: boolean;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full py-10 ${bgColor}`}
      style={
        gradient
          ? {
              background:
                "linear-gradient(to bottom right, #23417c 50%, #d47557 50%)",
              opacity: 0.1,
            }
          : {}
      }
    >
      <div className="container mx-auto px-4">{children}</div>
    </motion.section>
  );
};