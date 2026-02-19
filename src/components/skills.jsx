import skillsData from '../data/skillsdata';
import { motion } from 'framer-motion';

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 font-medium text-sm">{name}</span>
        <span className="text-cyan-400 font-bold text-sm">{level}%</span>
      </div>

      <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
      </div>
    </div>
  );
};

const SkillCategory = ({ title, skills, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
    >
      <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10 inline-block w-full">
        {title}
      </h3>

      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <SkillBar
            key={idx}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Technologies</span>
          </h2>
          <p className="text-slate-400 text-lg">
            My technical expertise across the MERN stack and development tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCategory
            title="Frontend"
            skills={skillsData.frontend}
            index={0}
          />
          <SkillCategory
            title="Backend"
            skills={skillsData.backend}
            index={1}
          />
          <SkillCategory
            title="Tools & Others"
            skills={skillsData.tools}
            index={2}
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;