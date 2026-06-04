import React from 'react'
import { NavLink, useNavigate, Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const sidebarLinks = [
  { to: '/admin/posts', label: 'Posts' },
  { to: '/admin/systems', label: 'Systems' },
]

const AdminLayout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-[#131624] via-[#181d2f] to-[#191c28]">
      {/* Sidebar */}
      <aside className="w-56 min-w-[200px] flex flex-col border-r border-[#22263a] bg-[#131624] py-10 px-0">
        <div className="text-[#a9b4df] font-black text-3xl mb-10 pl-6 tracking-wide select-none">
          Admin
        </div>
        <nav className="flex-1 w-full">
          <ul className="flex flex-col gap-1 w-full">
            <li>
                <Link to="/admin" className="block px-8 py-3 text-lg font-medium rounded-r-lg transition-all border-l-4 border-transparent text-[#d8daee] hover:bg-[#22253a] hover:text-[#6cdcff]">Dashboard</Link>
            </li>
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'block px-8 py-3 text-lg font-medium rounded-r-lg transition-all',
                      'border-l-4',
                      isActive
                        ? 'border-blue-400 bg-[#1e2336] text-[#8ec5fc] font-semibold'
                        : 'border-transparent text-[#d8daee] hover:bg-[#22253a] hover:text-[#6cdcff]'
                    ].join(' ')
                  }
                  end
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mx-6 mt-auto mb-2 bg-[#242846] text-[#ee598a] font-bold text-base rounded shadow-md py-3 px-8 transition-colors hover:bg-[#23243e] hover:text-[#ffaed9] focus:outline-none"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto bg-gradient-radial from-[#232745] via-[#23263a] to-[#181924] py-12 px-12 text-[#e5e7ec]">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout