import projectsData from '../data/projectdata';
import ProjectCard from "./ProjectCard.jsx";
import { motion } from 'framer-motion';

function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative scroll-mt-32">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold text-sm tracking-wide uppercase">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Masterpieces</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            A curated collection of web applications demonstrating my passion for
            <span className="text-cyan-400"> performance</span>,
            <span className="text-purple-400"> design</span>, and
            <span className="text-pink-400"> user experience</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                image={project.image}
                liveLink={project.liveLink}
                githubLink={project.githubLink}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;