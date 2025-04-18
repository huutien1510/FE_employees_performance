import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiMoon, FiSun, FiCheckCircle, FiTarget, FiHome, FiBarChart2, FiUsers, FiPlus, FiEdit2, FiTrash2, FiClock, FiMessageSquare, FiCalendar, FiArrowRight, FiFolder, FiFile, FiStar, FiShare2, FiSearch, FiBell, FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const UserSidebar = ({ darkMode }) => {
  return (
    <section id="sidebar"
      className="w-64 p-4 my-4">
      <div className={`mt-16 w-72 ${darkMode ? "bg-gray-900" : "bg-white"} h-screen fixed left-0 top-0 p-6 border-r ${darkMode ? "border-gray-800" : "border-gray-200"} shadow-lg`}>
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-500 rounded-lg">
            <FiUsers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">HR Assessment</h1>
        </div>
        <nav className="space-y-3">
          {[
            { icon: FiUsers, label: "Profiles", to: "/user/profiles" },
            { icon: FiBarChart2, label: "Assessments", to: "/user/assessments" },
            { icon: FiMessageSquare, label: "Reviews", to: "/user/reviews" },
            { icon: FiSettings, label: "Settings", to: "/user/set" }
          ].map((item) => (
            <NavLink
              to={item.to}
              key={item.label}
              end={item.end}
              className={({ isActive }) => `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-500 text-white hover:text-gray-700" : darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default UserSidebar;