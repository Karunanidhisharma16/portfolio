import Navbar from './components/navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/skills';
import Contact from './components/contact';
import DSA from './components/DSA';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#030014]" />

      {/* 3D Grid Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #4f4f4f2e 1px, transparent 1px),
            linear-gradient(to bottom, #4f4f4f2e 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
          transformOrigin: 'top center',
        }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_70%)]" />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen"
      />
    </div>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-purple-500/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      <AnimatedBackground />

      {/* Mouse Spotlight */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      <div className="relative z-10 flex flex-col gap-20 sm:gap-32 pb-20 overflow-x-hidden">
        <Navbar />
        <Hero />
        <Projects />
        <DSA />
        <Skills />
        <Contact />
      </div>
    </div>
  );
};

export default App;