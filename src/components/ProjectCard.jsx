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
    <div className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col">

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex gap-2">
            {tech.slice(0, 3).map((t, i) => (
              <span key={i} className="text-xs font-bold px-2 py-1 bg-black/50 backdrop-blur-md rounded-md text-cyan-400 border border-cyan-500/20">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tech Stack Badges (Remaining) */}
        {tech.length > 3 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.slice(3).map((technology, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/5 text-slate-300 text-xs rounded-md"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {/* Live Demo */}
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2.5 rounded-xl font-semibold transition text-sm shadow-lg hover:shadow-cyan-500/25"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>

          {/* GitHub */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-xl font-semibold transition text-sm"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
