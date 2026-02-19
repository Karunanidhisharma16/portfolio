/**
 * ==========================================================================
 * PROJECT CARD COMPONENT (Reusable)
 * ==========================================================================
 */

import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  description,
  tech,
  image,
  liveLink,
  githubLink,
}) => {
  return (
    <motion.div
      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
      whileHover={{ y: -8 }}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noreferrer" className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition">
                <ExternalLink size={20} />
              </a>
            )}
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-400 mb-6 flex-grow leading-relaxed text-sm">
          {description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/5 text-blue-300 text-xs font-mono rounded-full border border-white/5 hover:bg-white/10 transition"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Footer Actions (Small screens mainly as overlay handles desktop) */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
          {liveLink ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-blue-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              Live Demo <ExternalLink size={14} />
            </a>
          ) : <span />}

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
