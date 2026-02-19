import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://portfoliobackend-jigr.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Information
            </h3>

            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email</p>
                <a
                  href="mailto:karunanidhisharma89@gmail.com"
                  className="text-slate-400 hover:text-purple-400 transition"
                >
                  karunanidhisharma89@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Location</p>
                <p className="text-slate-400">Bhilwara, Rajasthan – 311001, India</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-semibold text-white mb-4">Connect with me</p>
              <div className="flex gap-4">
                {[
                  { Icon: Github, href: "https://github.com/Karunanidhisharma16", color: "hover:text-white" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/karunanidhi-sharma-154465323", color: "hover:text-blue-400" },
                  { Icon: Mail, href: "mailto:karunanidhisharma89@gmail.com", color: "hover:text-red-400" }
                ].map(({ Icon, href, color }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl flex items-center justify-center text-slate-400 ${color} transition-all duration-300 hover:scale-110`}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-sm"
                >
                  ✓ Message sent successfully!
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm"
                >
                  ✗ Failed to send message. Please try again.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                <Send size={18} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
