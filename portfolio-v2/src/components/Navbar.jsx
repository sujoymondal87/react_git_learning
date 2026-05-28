import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-gray-950 top-0 text-white">
      <div className="flex items-center font-bold text-2xl">
        Sujoy Mondal
      </div>
      <div className="flex items-center gap-4">
        <Link to="/work">Work</Link>
        <Link to="/system">System</Link>
        <Link to="/writing">Writing</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  )
}

export default Navbar