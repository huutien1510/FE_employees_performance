import React, { useState } from "react";
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiMoon, FiSun, FiCheckCircle, FiTarget, FiHome, FiBarChart2, FiUsers } from "react-icons/fi";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const glassStyle = darkMode ? 
    "bg-gray-900/80 backdrop-blur-lg border border-gray-700" :
    "bg-white/80 backdrop-blur-lg border border-gray-200";

  return (
    <div className={`mt-16 min-h-screen p-8 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-blue-50 via-white to-gray-100"} bg-opacity-95`}>
      <div className={`max-w-7xl mx-auto ${glassStyle} rounded-2xl p-8 shadow-xl`}>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            KPI Management System
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-all duration-300 shadow-lg`}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className={`${glassStyle} p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
            <div className="flex items-center space-x-4">
              <FiBarChart2 className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-semibold">KPI Metrics</h2>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Track and manage your key performance indicators</p>
          </div>

          <div className={`${glassStyle} p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
            <div className="flex items-center space-x-4">
              <FiUsers className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-semibold">Team Assessment</h2>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Evaluate and monitor team performance</p>
          </div>

          <div className={`${glassStyle} p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
            <div className="flex items-center space-x-4">
              <FiTarget className="w-8 h-8 text-green-500" />
              <h2 className="text-2xl font-semibold">Goals</h2>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Set and track organizational objectives</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${glassStyle} p-8 rounded-xl`}>
            <h3 className="text-2xl font-semibold mb-6">Recent Assessments</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">Employee #{item}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">85%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${glassStyle} p-8 rounded-xl`}>
            <h3 className="text-2xl font-semibold mb-6">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Reviews</p>
                <p className="text-3xl font-bold">287</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending KPIs</p>
                <p className="text-3xl font-bold">63</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                <p className="text-3xl font-bold">48</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-3xl font-bold">88%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;