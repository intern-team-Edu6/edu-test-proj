"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, GraduationCap, Users } from "lucide-react";

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />

        {/* Bouncing Ball - Basketball */}
        <motion.div className="absolute top-[15%] left-[10%] text-6xl">
          <motion.div
            initial={{ x: -300, y: -300 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8,
              }}
            >
              🏀
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Pencil */}
        <motion.div className="absolute top-[35%] left-[8%] text-5xl">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [45, 60, 45],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              ✏️
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Genre Icons - Arts */}
        <motion.div className="absolute top-[50%] right-[12%] text-6xl">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2,
              }}
            >
              🎨
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Genre Icons - Entertainment/Gaming */}
        <motion.div className="absolute bottom-1/3 right-1/5 text-6xl">
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                y: [0, 25, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
            >
              🎮
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Genre Icons - Sports */}
        <motion.div className="absolute top-[25%] left-[25%] text-6xl">
          <motion.div
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8,
              }}
            >
              ⚽
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Genre Icons - Education */}
        <motion.div className="absolute bottom-[25%] left-[15%] text-6xl">
          <motion.div
            initial={{ x: -300, y: 300 }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 2.1, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.3,
              }}
            >
              📚
            </motion.div>
          </motion.div>
        </motion.div>
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
          className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6"
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
            className="bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            SkillsHub
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-4 max-w-3xl mx-auto font-semibold"
        >
          Таны хүүхдийн авьяас, амжилтыг хамтдаа хөгжүүлье
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto"
        >
          Хүүхдийнхээ ирээдүйг бид хамтдаа бүтээе
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
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                className="inline-block mb-4 text-orange-600"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute  left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-slate-400"
          >
            <span className="text-sm font-medium">Доош гүйлгэх</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
