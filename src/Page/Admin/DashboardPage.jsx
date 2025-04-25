import React, { useState } from "react";
import { FiMoon, FiSun, FiCheckCircle, FiClock } from "react-icons/fi";

const DashboardPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const glassStyle = darkMode
    ? "bg-gray-900/80 backdrop-blur-lg border border-gray-700"
    : "bg-white/80 backdrop-blur-lg border border-gray-200";

  // Dữ liệu giả cho Upcoming Deadlines
  const upcomingDeadlines = [
    { id: 1, kpiName: "Sales Target Q2", dueDate: "2025-04-30", status: "In Progress" },
    { id: 2, kpiName: "Customer Feedback Review", dueDate: "2025-05-05", status: "Not Started" },
    { id: 3, kpiName: "Team Performance Audit", dueDate: "2025-05-10", status: "In Progress" },
  ];

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-blue-50 via-white to-gray-100"} bg-opacity-95`}>
      <div className={`max-w-7xl mx-auto ${glassStyle} rounded-2xl p-8 shadow-xl`}>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            KPI Management Website
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-all duration-300 shadow-lg`}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>

        {/* New Banner Section */}
        <div className="relative mb-12 overflow-hidden rounded-xl">
          <div className={`absolute inset-0 bg-gradient-to-r ${darkMode ? "from-indigo-900 to-gray-800" : "from-indigo-200 to-gray-200"} opacity-90`} />
          <div className="relative p-8 text-center">
            <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-indigo-800"} mb-4`}>Monitor Your KPIs Efficiently</h2>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Stay on top of your performance goals with real-time insights and actionable data.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* <div className={`${glassStyle} p-8 rounded-xl`}>
            <h3 className="text-2xl font-semibold mb-6">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiClock className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className="font-medium">{item.kpiName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          <div className={`${glassStyle} p-8 rounded-xl`}>
            <h3 className="text-2xl font-semibold mb-6">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Reviews</p>
                <p className="text-3xl font-bold">11</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Assessments</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</p>
                <p className="text-3xl font-bold">1</p>
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

export default DashboardPage;