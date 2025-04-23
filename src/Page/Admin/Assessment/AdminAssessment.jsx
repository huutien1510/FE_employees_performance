import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiSun, FiMoon, FiFile, FiCalendar, FiBarChart2, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

const AdminAssessments = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [assessments, setAssessments] = useState(null);
    const inputRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [reviewedElements, setReviewedElements] = useState(0);
    const [pendingElements, setPendingElements] = useState(0);
    const [cancelElements, setCancelElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const size = 10;
    const location = useLocation();

    useEffect(() => {
        const fetchAssessment = async (page) => {
            try {
                if (inputRef.current) inputRef.current.value = page;
                const response = await fetch(`http://localhost:8080/assessment/getAllAssessment?page=${page - 1}&size=${size}`);
                const res = await response.json();
                setAssessments(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchTotalPages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/assessment/getTotalElements`);
                const res = await response.json();
                console.log(res.data)
                setReviewedElements(res.data.reviewedElements);
                setPendingElements(res.data.pendingElements);
                setCancelElements(res.data.cancelElements);
                setTotalElements(res.data.reviewedElements + res.data.pendingElements + res.data.cancelElements);
                setTotalPages(Math.ceil((res.data.reviewedElements + res.data.pendingElements + res.data.cancelElements) / size));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAssessment(currentPage);
        fetchTotalPages();
    }, [currentPage, location]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const glassStyle = darkMode
        ? "bg-gray-800/70 backdrop-blur-xl border border-gray-600/50 hover:border-gray-500/50"
        : "bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-gray-300/50";

    const handleDelete = (id) => {
        setAssessments(assessments?.filter((a) => a.id !== id));
    };

    return (
        <div className={`w-full min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Assessment
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className={`flex items-center gap-4 px-4 py-3 bg-blue-500 text-white font-medium rounded-xl transition-all duration-300 ${darkMode ? "hover:bg-gray-800" : "hover:bg-blue-700 hover:text-gray-700"
                                    }`}
                            >
                                <FiPlus className="w-5 h-5" />
                                New Assessment
                            </button>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200 " : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                    }`}
                            >
                                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-blue-50 border border-blue-200/50"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Total Assessments</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{totalElements}</p>
                        </div>
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-green-50 border border-green-200/50"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Reviewed</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                                {reviewedElements}
                            </p>
                        </div>
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-yellow-50 border border-yellow-200/50"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Pending</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                                {pendingElements}
                            </p>
                        </div>
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-red-50 border border-red-200/50"
                                }`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Cancel</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>
                                {cancelElements}
                            </p>
                        </div>
                    </div>
                    <div>
                        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>filter</span>
                    </div>

                    <div className="space-y-8">
                        <div className={`rounded-lg shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-bold">Assessments</h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-3">
                                    {assessments?.map((assessment) => (
                                        <div
                                            key={assessment?.assessmentId}
                                            className={`${glassStyle} p-4 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-[1.01]`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 bg-gradient-to-r from-blue-700/20 to-purple-700/20 rounded-md">
                                                        <FiFile className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                                            {assessment?.employeeName} - KPI: {assessment?.kpiName}
                                                        </h3>
                                                        <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>KPA: {assessment?.kpaName}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-sm font-medium ${assessment?.status === 'reviewed' ?
                                                            (darkMode
                                                                ? "bg-green-900/50 text-green-400"
                                                                : "bg-green-100 text-green-700")
                                                            : assessment?.status === 'pending'
                                                                ? (darkMode
                                                                    ? "bg-yellow-900/50 text-yellow-400"
                                                                    : "bg-yellow-100 text-yellow-700")
                                                                : (darkMode
                                                                    ? "bg-red-900/50 text-red-400"
                                                                    : "bg-red-100 text-red-700")
                                                            }`}
                                                    >
                                                        {assessment?.status === 'reviewed'
                                                            ? "Reviewed"
                                                            : assessment?.status === 'pending'
                                                                ? "Pending"
                                                                : "Cancelled"}
                                                    </span>

                                                    <span
                                                        className={`text-sm flex items-center gap-1 whitespace-nowrap ${darkMode ? "text-gray-400" : "text-gray-500"
                                                            }`}
                                                    >
                                                        <FiCalendar className="w-4 h-4" />
                                                        {new Date(assessment?.updatedAt).toLocaleDateString("vi-VN", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <FiBarChart2 className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                                                    <span className={`text-sm font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                                        Evaluate: {assessment?.evaluate} %
                                                    </span>
                                                    <span className={`ml-24 text-sm font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                                        Line Manager:  {assessment?.lineManagerName} - {assessment?.lineManagerJobTitle}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <NavLink to={`/admin/assessment_details`}
                                                        state={{ "assessment": assessment }}
                                                        className={`p-1.5 rounded-md transition-colors ${darkMode
                                                            ? "hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-purple-700/20"
                                                            : "hover:bg-gradient-to-r hover:from-blue-700/10 hover:to-purple-700/10"
                                                            }`}
                                                        title="Details"
                                                    >
                                                        <FiEye className={`w-4 h-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`} />
                                                    </NavLink>
                                                    <button
                                                        className={`p-1.5 rounded-md transition-colors ${darkMode
                                                            ? "hover:bg-gradient-to-r hover:from-red-700/20 hover:to-red-900/20"
                                                            : "hover:bg-gradient-to-r hover:from-red-700/10 hover:to-red-900/10"
                                                            }`}
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-500"}`} />
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

            <div>
                <div className="flex items-center justify-center mt-6 mb-8">
                    <button
                        className={`px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span
                        className={`mx-4 px-4 py-2 rounded-lg transition-all duration-300 ${darkMode
                            ? "bg-gray-800 border-2 border-blue-600/50 text-gray-200 hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-purple-700/20"
                            : "bg-gray-100 border-2 border-blue-600 text-gray-900 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10"
                            }`}
                    >
                        Page
                        <input
                            className={`mx-4 w-16 text-center p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-blue-600/50 text-gray-200" : "bg-white border-blue-600 text-gray-900"
                                }`}
                            ref={inputRef}
                            type="number"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const value =
                                        e.target.value > totalPages ? totalPages : e.target.value < 1 ? 1 : e.target.value;
                                    handlePageChange(value);
                                }
                            }}
                        />
                        of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div >
    );
};

export default AdminAssessments;