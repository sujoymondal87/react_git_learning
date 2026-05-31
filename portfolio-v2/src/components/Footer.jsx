import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 mt-16">
            <div className="max-w-[1100px] mx-auto px-6 py-12">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-amber-500 font-bold text-xl mb-2">Sujoy Mondal</p>
                        <p className="text-gray-400 text-sm max-w-sm">Building resilient systems, end-to-end, for a decade.</p>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-sm font-semibold mb-1">Navigation</p>
                            <Link className="text-gray-400 text-sm hover:text-amber-500 transition" to="/">Home</Link>
                            <Link className="text-gray-400 text-sm hover:text-amber-500 transition" to="/case-studies">Case Studies</Link>
                            <Link className="text-gray-400 text-sm hover:text-amber-500 transition" to="/contact">Contact</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-sm font-semibold mb-1">Connect</p>
                            <a className="text-gray-400 text-sm hover:text-amber-500 transition" href="https://linkedin.com/in/sujoymondal-tech" target="_blank" rel="noreferrer">
                                <FaLinkedin className="inline-block mr-1" /> LinkedIn
                            </a>
                            <a className="text-gray-400 text-sm hover:text-amber-500 transition" href="https://github.com/sujoymondal87" target="_blank" rel="noreferrer">
                                <FaGithub className="inline-block mr-1" /> GitHub
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6">
                    <p className="text-gray-500 text-xs">© 2026 Sujoy Kumar Mondal</p>
                </div>
            </div>
        </footer>
    )
}