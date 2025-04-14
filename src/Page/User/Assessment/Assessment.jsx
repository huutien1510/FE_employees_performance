import React, { useEffect, useState } from "react";
import {FiPlus,FiSun,FiMoon,FiFile,FiCalendar,FiBarChart2,FiEdit2,FiTrash2,} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Assessments = () => {
  const accountID = localStorage.getItem("accountID");
  const [darkMode, setDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [assessments, setAssessments] = useState(null);

  useEffect(()=>{
    const fetchAssessmentByEmployee = async()=>{
      try {
          const response = await fetch(`http://localhost:8080/assessment/getAllAssessmentByEmployee/${accountID}`);
          const res = await response.json();
          setAssessments(res.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };
    fetchAssessmentByEmployee();
    },[])
  
    const glassStyle = darkMode ? 
    "bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50" :
    "bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-gray-300/50";

  const handleDelete = (id) => {
    setAssessments(assessments?.filter(a => a.id !== id));
  };

  return (
    <div className={`mt-12 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Assessments</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <FiPlus className="w-5 h-5" />
                New Assessment
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Total Assessments</h3>
              <p className="text-3xl font-bold">{assessments?.length}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Reviewed</h3>
              <p className="text-3xl font-bold">{assessments?.filter(a => a.is_reviewed).length}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Pending</h3>
              <p className="text-3xl font-bold">{assessments?.filter(a => !a.is_reviewed).length}</p>
            </div>
          </div>
  
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 border-b dark:border-gray-700">
                <h2 className="font-semibold">Recent Assessments</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {assessments?.map((assessment) => (
                    <div key={assessment?.id} className={`${glassStyle} p-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FiFile className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{assessment?.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{assessment?.comments}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${assessment?.is_reviewed ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                            {assessment?.is_reviewed ? "Reviewed" : "Pending"}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            {assessment?.submitted_date}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <FiBarChart2 className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">KPI Score: {assessment?.kpi_score}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiEdit2 className="w-5 h-5 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FiTrash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  };

export default Assessments;
