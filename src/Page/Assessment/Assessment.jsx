import React, { useEffect, useState } from "react";
import {FiPlus,FiSun,FiMoon,FiCheckCircle,FiClock,FiCalendar,FiArrowRight,FiTrash2,} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Assessments = () => {
    const accountID = localStorage.getItem("accountID");
  const [darkMode, setDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [assessments, setAssessments] = useState(null); 

  const glassStyle = darkMode
    ? "bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50"
    : "bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-gray-300/50";

  const handleDelete = (id) => {
    setAssessments(assessments.filter((a) => a.id !== id));
  };

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

  return (
    <div
      className={`mt-12 min-h-screen p-8 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-50 via-white to-gray-100"
      } bg-opacity-95`}
    >
      <div className={`max-w-7xl mx-auto ${glassStyle} rounded-2xl p-8 shadow-xl`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            My Assessments
          </h1>
          <div className="flex gap-4">
            <NavLink to={"/assessment_create"}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <FiPlus className="w-5 h-5" />
              New Assessment
            </NavLink>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${
                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
              } transition-all duration-300 shadow-lg`}
            >
              {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
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
            <p className="text-3xl font-bold">{assessments?.filter((a) => a.is_reviewed).length}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Pending</h3>
            <p className="text-3xl font-bold">{assessments?.filter((a) => !a.is_reviewed).length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments?.map((assessment) => (
            <div
              key={assessment?.id}
              className={`${glassStyle} p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer group`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold truncate pr-4">
                  {assessment?.title}
                </h3>
                {!assessment?.is_reviewed && (
                  <button
                    onClick={() => handleDelete(assessment?.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  {assessment?.submitted_date}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${assessment?.is_reviewed
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    } flex items-center gap-1`}
                >
                  {assessment?.is_reviewed ? (
                    <FiCheckCircle className="w-3 h-3" />
                  ) : (
                    <FiClock className="w-3 h-3" />
                  )}
                  {assessment?.is_reviewed ? "Reviewed" : "Pending"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">KPI Score:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {assessment?.kpi_score}%
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-sm font-medium">
                  View Details
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
