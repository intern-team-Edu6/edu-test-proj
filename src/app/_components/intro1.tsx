"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, GraduationCap, Users } from "lucide-react";

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = ["/fun.jpeg", "/sport.jpg ", "/art.jpg"];

  useEffect(() => {
    setIsVisible(true);

    // Rotate images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Олон төрлийн хичээл",
      description: "Спорт, урлаг, боловсролын сургалт",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Амжилтын баталгаа",
      description: "Мэргэжлийн багш, батлагдсан арга зүй",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Хүүхдийн хөгжил",
      description: "Авьяас чадвар, өөртөө итгэх итгэл",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Rotation */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${image}')`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-white/0 to-purple-50/0" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            SkillsHub
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-slate-900 mb-4 max-w-3xl mx-auto font-semibold"
        >
          <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl ">
            Таны хүүхдийн авьяас, амжилтыг хамтдаа хөгжүүлье
          </span>
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-700 mb-12 max-w-2xl mx-auto"
        >
          <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl">
            Хүүхдийнхээ ирээдүйг бид хамтдаа бүтээе
          </span>
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <motion.span
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            />
            <span className="relative z-10 flex items-center gap-2">
              Хичээл сонгох
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-slate-200 hover:border-orange-400 transition-all duration-300"
            >
              <div className="inline-block mb-4 text-orange-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
