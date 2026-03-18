import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Coins,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { UserContext } from "../components/userContext";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, fetchUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white md:overflow-hidden overflow-auto">

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
        flex flex-col justify-between
        backdrop-blur-xl bg-white/5 border-r border-white/10
        transition-all duration-300 ease-in-out

        ${collapsed ? "w-20 md:w-20" : "w-64 md:w-64"}

        /* MOBILE */
        fixed md:relative top-0 left-0 h-screen md:h-auto
        ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}

        z-50
        `}
      >
        {/* Logo + Toggle */}
        <div>
          <div className="flex items-center justify-between px-6 h-16">
            <h1
              className={`
                text-lg font-semibold tracking-wide
                transition-all duration-300
                whitespace-nowrap
                ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
              `}
            >
              AI Ocula
            </h1>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400 hover:text-white transition cursor-pointer"
            >
              {collapsed ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </button>
          </div>

          {/* Nav */}
          <nav className="mt-6 space-y-2 px-3">
            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              collapsed={collapsed}
              end
            />
            <NavItem
              to="generate"
              icon={<Sparkles size={20} />}
              label="Generate"
              collapsed={collapsed}
            />
            <NavItem
              to="credits"
              icon={<Coins size={20} />}
              label="Credits"
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
            text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col bg-[#0E1424]">

        {/* Top Bar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-8">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setCollapsed(false)}
            className="md:hidden text-white text-xl"
          >
            ☰
          </button>

          <h2 className="hidden md:block text-lg font-medium tracking-wide">
            Welcome Back {user?.name?.split(" ")[0]}👋
          </h2>

          {/* Profile */}
          <div className="flex items-center gap-6">

            {/* Credits */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-400">Credits</span>
              <span className="text-sm font-semibold text-purple-400">
                {user?.credits}
              </span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-400">Free Plan</p>
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-sm font-semibold">
                {user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ================= NavItem ================= */

const NavItem = ({ to, icon, label, collapsed, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg
        transition-all duration-200
        ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`
      }
    >
      <div className="flex items-center justify-center w-5">
        {icon}
      </div>

      <span
  className={`
    text-sm font-medium tracking-wide
    transition-all duration-200
    whitespace-nowrap
    ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto ml-2"}
  `}
>
  {label}
</span>
    </NavLink>
  );
};