import React, { useState } from "react";
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiMoon, FiSun, FiCheckCircle, FiTarget } from "react-icons/fi";

const Assessment = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    kpa_id: "",
    kpi_id: "",
    evaluate: 0,
    comments: "",
    link: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assessment submitted:", formData);
  };

  const glassStyle = darkMode ? 
    "bg-gray-900/80 backdrop-blur-lg border border-gray-700" :
    "bg-white/80 backdrop-blur-lg border border-gray-200";

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-blue-50 via-white to-gray-100"} bg-opacity-95 mt-16`}>
      <div className={`max-w-4xl mx-auto ${glassStyle} rounded-2xl p-8 shadow-xl`}>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            KPI Assessment
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} transition-all duration-300 shadow-lg`}
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Employee ID</label>
              <input
                type="number"
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.employee_id}
                onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">KPA ID</label>
              <input
                type="number"
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.kpa_id}
                onChange={(e) => setFormData({...formData, kpa_id: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">KPI ID</label>
              <input
                type="number"
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.kpi_id}
                onChange={(e) => setFormData({...formData, kpi_id: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Evaluation Score</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
                value={formData.evaluate}
                onChange={(e) => setFormData({...formData, evaluate: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Comments</label>
            <textarea
              className="w-full p-4 border-0 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-inner"
              rows="4"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              placeholder="Add your assessment comments..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Envident</label>
            <input
              type="url"
              className="w-full p-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 shadow-inner"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="https://example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg shadow-lg"
          >
            Submit Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assessment;