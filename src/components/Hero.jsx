
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">

      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl w-full text-center z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10 inline-block relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur cupacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-40 h-40 rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-800 overflow-hidden">
            <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-cyan-400">
              KS
            </div>
            {/* Replace this with <img src={profilePic} /> if available */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl text-cyan-400 font-semibold mb-4 tracking-wide uppercase">
            Full Stack Developer
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
            Karunanidhi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Sharma</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Passionate about crafting elegant solutions to complex problems.
          Building modern web applications with React, Node.js, and MongoDB.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-bold transition shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1"
          >
            View Projects
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold transition shadow-lg hover:shadow-white/5 transform hover:-translate-y-1"
          >
            Contact Me
          </button>

          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold transition shadow-lg hover:shadow-white/5 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <Download size={20} />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-8"
        >
          {[
            { Icon: Github, href: "https://github.com/Karunanidhisharma16" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/karunanidhi-sharma-154465323" },
            { Icon: Mail, href: "mailto:karunanidhisharma89@gmail.com" }
          ].map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-cyan-400 transition-all duration-300 border border-white/5 hover:border-cyan-500/30 group"
            >
              <Icon size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
