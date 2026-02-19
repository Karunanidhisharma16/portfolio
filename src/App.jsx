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
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0a0a0a]">

      {/* Crisp Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial Gradient Glow for depth (centered) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(124,58,237,0.15),transparent)]" />

      {/* Floating Geometric Shapes (Squares/Plus) for "Designed" feel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[15%] w-32 h-32 border border-purple-500/20 rounded-lg rotate-12"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[60%] right-[10%] w-24 h-24 border border-cyan-500/20 rounded-full"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-[20%] left-[30%] text-6xl text-slate-700/10 font-mono pointer-events-none select-none"
      >
        +
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
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