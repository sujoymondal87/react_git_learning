import { useState } from "react";
import Layout from "../components/Layout";
import toast from 'react-hot-toast'
import { FiMail, FiArrowRight, FiSend } from 'react-icons/fi'
import { FaLinkedin, FaGithub, FaReact, FaNode } from 'react-icons/fa'
import { SiVite, SiExpress, SiPostgresql, SiSupabase, SiTailwindcss, SiVercel, SiRailway, SiDocker, SiPhp, SiMysql, SiRedis, SiTypescript, SiJavascript, SiStripe, SiDigitalocean, SiGit,SiPaypal, SiOpenai, SiGooglegemini, SiClaude } from 'react-icons/si'

const iconSize = 22;
const techStack = [
  // Frontend
  { icon: <FaReact size={iconSize} />, name: 'React', color: '#61DAFB' },
  { icon: <SiVite size={iconSize} />, name: 'Vite', color: '#646CFF' },
  { icon: <SiTypescript size={iconSize} />, name: 'TypeScript', color: '#3178C6' },
  { icon: <SiJavascript size={iconSize} />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <SiTailwindcss size={iconSize} />, name: 'Tailwind', color: '#06B6D4' },
  { icon: <span className="text-2xl font-bold">Ng</span>, name: 'AngularJS', color: '#E23237' },
  { icon: <span className="text-sm font-bold">AR</span>, name: 'Browser AR', color: '#FF6B35' },
  // Backend
  { icon: <FaNode size={iconSize} />, name: 'Node.js', color: '#339933' },
  { icon: <SiExpress size={iconSize} />, name: 'Express', color: '#ffffff' },
  { icon: <SiPhp size={iconSize} />, name: 'PHP', color: '#777BB4' },
  // Database
  { icon: <SiPostgresql size={iconSize} />, name: 'PostgreSQL', color: '#4169E1' },
  { icon: <SiMysql size={iconSize} />, name: 'MySQL', color: '#4479A1' },
  { icon: <SiRedis size={iconSize} />, name: 'Redis', color: '#DC382D' },
  // Infrastructure
  { icon: <SiDocker size={iconSize} />, name: 'Docker', color: '#2496ED' },
  { icon: <SiVercel size={iconSize} />, name: 'Vercel', color: '#ffffff' },
  { icon: <SiRailway size={iconSize} />, name: 'Railway', color: '#8B5CF6' },
  { icon: <SiDigitalocean size={iconSize} />, name: 'DigitalOcean', color: '#0080FF' },
  { icon: <SiGit size={iconSize} />, name: 'Git', color: '#F05032' },
  { icon: <span className="text-sm font-bold">PM2</span>, name: 'PM2', color: '#A855F7' },
  // Services
  { icon: <SiSupabase size={iconSize} />, name: 'Supabase', color: '#3ECF8E' },
  { icon: <SiStripe size={iconSize} />, name: 'Stripe', color: '#635BFF' },
  { icon: <SiPaypal size={iconSize} />, name: 'PayPal', color: '#009CDE' },
  { icon: <span style={{fontSize:'24px'}}>⚡</span>, name: 'WebSocket', color: '#FFFFFF' },
  { icon: <span className="text-sm font-bold">IDB</span>, name: 'IndexedDB', color: '#F59E0B' },
  { icon: <span className="text-sm font-bold">SW</span>, name: 'Service Workers', color: '#4ADE80' },

  // Services — add to end
  { icon: <SiOpenai size={iconSize} />, name: 'OpenAI', color: '#ffffff' },
  { icon: <SiGooglegemini size={iconSize} />, name: 'Gemini', color: '#4285F4' },
  { icon: <SiClaude size={iconSize} />, name: 'Claude', color: '#D97757' },
]


function Contact() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    content: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('https://reactgitlearning-production.up.railway.app/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        message: form.content
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setForm({
          fullName: "",
          content: "",
          email: "",
          phone: ""
        });
        toast.success('Message sent successfully.');
      })
      .catch((error) => {
        toast.error('Something went wrong. Please try again or email me directly.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="py-6 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Left Panel */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-amber-500 text-sm font-mono mb-4">Let's connect</p>
              <h2 className="text-4xl font-bold text-white mb-4">Building production systems under real-world constraints.</h2>
              <p className="text-gray-300 leading-relaxed">10+ years building production systems end-to-end. I design, build and operate browser-based platforms that work under real-world constraints.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-500">15+</div>
                <div className="text-xs text-gray-400">Years building production systems</div>
              </div>
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-500">609</div>
                <div className="text-xs text-gray-400">Verified reviews. 4.54 rating.</div>
              </div>
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-500">35+</div>
                <div className="text-xs text-gray-400">Countries. Global reach.</div>
              </div>
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-500">20+</div>
                <div className="text-xs text-gray-400">Production systems built.</div>
              </div>
            </div>
            {/* Open to */}
            <div className="border border-gray-800 rounded-lg p-6">
              <p className="text-amber-500 text-sm font-mono mb-4">Currently open to</p>
              <div className="flex flex-col gap-2">
                {['Remote Senior Product Engineer', 'Founding Engineer', 'Systems Architect', 'Technical Consulting'].map(role => (
                  <div key={role} className="flex items-center gap-2 text-gray-300">
                    <span className="text-amber-500">✓</span>
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-4">
              <a href="mailto:sujoymondal87@gmail.com" className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg hover:border-amber-500 transition group">
                <div className="text-amber-500"><FiMail size={20} /></div>
                <div>
                  <p className="text-white text-sm font-medium">Email</p>
                  <p className="text-gray-400 text-sm">sujoymondal87@gmail.com</p>
                </div>
                <FiArrowRight className="ml-auto text-gray-600 group-hover:text-amber-500 transition" />
              </a>
              <a href="https://linkedin.com/in/sujoymondal-tech" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg hover:border-amber-500 transition group">
                <div className="text-amber-500"><FaLinkedin size={20} /></div>
                <div>
                  <p className="text-white text-sm font-medium">LinkedIn</p>
                  <p className="text-gray-400 text-sm">linkedin.com/in/sujoymondal-tech</p>
                </div>
                <FiArrowRight className="ml-auto text-gray-600 group-hover:text-amber-500 transition" />
              </a>
              <a href="https://github.com/sujoymondal87" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 border border-gray-800 rounded-lg hover:border-amber-500 transition group">
                <div className="text-amber-500"><FaGithub size={20} /></div>
                <div>
                  <p className="text-white text-sm font-medium">GitHub</p>
                  <p className="text-gray-400 text-sm">github.com/sujoymondal87</p>
                </div>
                <FiArrowRight className="ml-auto text-gray-600 group-hover:text-amber-500 transition" />
              </a>
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">Send a message</h3>
            <p className="text-gray-400 text-sm mb-6">Fill in the details and I'll get back to you.</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Full Name *</label>
                <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Role / Project / Company</label>
                <input type="text" name="role" value={form.role || ''} onChange={handleChange}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="e.g. Founding Engineer at Acme" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Message *</label>
                <textarea name="content" value={form.content} onChange={handleChange} rows={5}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="Tell me about the role or project..."
                  required />
              </div>
              <button type="submit" disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
              </button>
            </form>
            <div className="mt-8 pt-4 border-t border-gray-800">
              <div className="flex flex-wrap justify-center items-center gap-4">
                {techStack.map(tech => (
                  <div key={tech.name} className="flex flex-col items-center gap-1 hover:text-amber-500 transition" style={{ color: tech.color }}>
                    {tech.icon}
                    <span className="text-xs font-mono">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Contact;