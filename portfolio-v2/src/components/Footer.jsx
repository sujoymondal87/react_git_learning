import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-gray-100 py-6 border-t border-gray-700 flex flex-col items-center justify-center">
            <nav className="mb-2 flex gap-6">
                <Link className="hover:text-blue-400 transition" to="/">Home</Link>
                <Link className="hover:text-blue-400 transition" to="/systems">Systems</Link>
                <Link className="hover:text-blue-400 transition" to="/case-studies">Case Studies</Link>
                <Link className="hover:text-blue-400 transition" to="/contact">Contact</Link>
            </nav>
            <div className="mb-1 text-sm">Building resilient systems, end-to-end, for a decade.</div>       
            <div className="text-xs text-gray-400">&copy; 2026 Sujoy Mondal</div>
        </footer>
    )
}