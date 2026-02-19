import projectsData from '../data/projectdata';
import ProjectCard from "./ProjectCard.jsx";
import { motion } from 'framer-motion';

function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Here are some of my recent works showcasing my skills in web development
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