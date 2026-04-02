import { FiLogOut } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { SIDEBAR_ITEMS } from './dashboardConstants'

const Sidebar = ({ admin, onLogout }) => {
  return (
    <aside className="w-full border-b border-GrayBorder bg-white p-5 shadow-sm lg:min-h-screen lg:w-[280px] lg:flex-none lg:border-r lg:border-b-0 lg:p-6">
      <div className="rounded-[28px] bg-[linear-gradient(135deg,#f7f1e8_0%,#fffaf3_100%)] p-5">
        <p className="text-xs uppercase tracking-[0.32em] text-TextDateColor">Company</p>
        <h1 className="mt-3 font-['Cormorant_Garamond',serif] text-4xl leading-none text-TextBlack">
          North East Luxury
        </h1>
        <p className="mt-3 text-sm text-TextGray">Admin panel for booking operations and overview.</p>
      </div>

      <nav className="mt-8 space-y-3">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={`/dashboard/${item.id}`}
            className={({ isActive }) =>
              `flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                isActive
                ? 'bg-[#2d2017] text-[#f7f1e8]'
                : 'text-TextGray hover:bg-[#f8f4ed] hover:text-TextBlack'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <item.icon className="text-lg" />
              {item.label}
            </span>
            <span className="text-lg">{'>'}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 rounded-[28px] border border-GrayBorder bg-[#faf7f2] p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-TextGray">Signed in as</p>
        <p className="mt-3 text-base font-semibold text-TextBlack">{admin?.name || 'Admin'}</p>
        <p className="mt-1 text-sm text-TextGray">{admin?.email || 'No email found'}</p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#2d2017] px-4 py-3 text-sm font-semibold text-[#2d2017] transition hover:bg-[#2d2017] hover:text-[#f7f1e8]"
      >
        <FiLogOut className="text-base" />
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
