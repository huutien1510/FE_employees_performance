import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiPlus, FiSun, FiMoon, FiFile, FiCalendar, FiBarChart2, FiEye, FiTrash2, FiSearch, FiUser } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

const AdminAssessments = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [assessments, setAssessments] = useState(null);
    const [employees, setEmployees] = useState([]); // Danh sách nhân viên cho dropdown
    const [selectedEmployee, setSelectedEmployee] = useState(""); // Nhân viên được chọn
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);
    const searchInputRef = useRef(null);
    const assessmentsBackupRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [reviewedElements, setReviewedElements] = useState(0);
    const [pendingElements, setPendingElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const size = 10;
    const location = useLocation();

    // Lấy danh sách nhân viên cho dropdown
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employees/getAllEmployees?page=0&size=1000`);
                const res = await response.json();
                setEmployees(res.data || []);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    // Lấy danh sách assessment (dựa trên nhân viên được chọn hoặc tất cả)
    useEffect(() => {
        const fetchAssessments = async (page) => {
            try {
                if (inputRef.current) inputRef.current.value = page;
                let url = `http://localhost:8080/assessment/getAllAssessment?page=${page - 1}&size=${size}`;
                if (selectedEmployee) {
                    url = `http://localhost:8080/assessment/getAssessmentsByEmployeeId?employeeId=${selectedEmployee}&page=${page - 1}&size=${size}`;
                }
                const response = await fetch(url);
                const res = await response.json();
                assessmentsBackupRef.current = res.data;
                setAssessments(res.data);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            }
        };

        const fetchTotalPages = async () => {
            try {
                let url = `http://localhost:8080/assessment/getTotalElements`;
                if (selectedEmployee) {
                    url = `http://localhost:8080/assessment/getTotalElementsByEmployeeId?employeeId=${selectedEmployee}`;
                }
                const response = await fetch(url);
                const res = await response.json();
                setReviewedElements(res.data.reviewedElements);
                setPendingElements(res.data.pendingElements);
                setTotalElements(res.data.reviewedElements + res.data.pendingElements);
                setTotalPages(Math.ceil((res.data.reviewedElements + res.data.pendingElements) / size));
            } catch (error) {
                console.error("Error fetching total elements:", error);
            }
        };

        fetchAssessments(currentPage);
        fetchTotalPages();
    }, [currentPage, location, selectedEmployee]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Debounce function cho tìm kiếm
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const performSearch = async (keyword) => {
        if (keyword.trim() !== "") {
            try {
                let url = `http://localhost:8080/assessment/searchByName?keyword=${encodeURIComponent(keyword)}`;
                if (selectedEmployee) {
                    url += `&employeeId=${selectedEmployee}`;
                }
                const response = await fetch(url);
                const res = await response.json();
                setAssessments(res.data);
            } catch (error) {
                console.error("Search failed:", error);
            }
        } else {
            setAssessments(assessmentsBackupRef.current);
        }
    };

    const debouncedSearch = useCallback(debounce(performSearch, 1000), [selectedEmployee]);

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchText(keyword);
        debouncedSearch(keyword);
    };

    const handleEmployeeChange = (e) => {
        const employeeId = e.target.value;
        setSelectedEmployee(employeeId);
        setCurrentPage(1); // Reset về trang 1 khi chọn nhân viên mới
        setSearchText(""); // Reset thanh tìm kiếm
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this assessment?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/assessment/deleteAssessmentById/${id}`, {
                    method: "DELETE",
                });
                setAssessments(assessments?.filter((a) => a.assessmentId !== id));
                alert("Assessment deleted successfully!");
            } catch (error) {
                console.error("Error deleting assessment:", error);
                alert("Failed to delete assessment. Please try again.");
            }
        }
    };

    const glassStyle = darkMode
        ? "bg-gray-800/70 backdrop-blur-xl border border-gray-600/50 hover:border-gray-500/50"
        : "bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-gray-300/50";

    return (
        <div className={`w-full min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Assessments
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                            >
                                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-blue-50 border border-blue-200/50"}`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Total Assessments</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{totalElements}</p>
                        </div>
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-green-50 border border-green-200/50"}`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Reviewed</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>{reviewedElements}</p>
                        </div>
                        <div
                            className={`p-6 rounded-xl transition-colors ${darkMode ? "bg-gray-800/50 border border-gray-700/50" : "bg-yellow-50 border border-yellow-200/50"}`}
                        >
                            <h3 className="text-lg font-semibold mb-2">Pending</h3>
                            <p className={`text-3xl font-bold ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>{pendingElements}</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div
                            className={`rounded-lg shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}
                        >
                            <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <h2 className="text-xl font-bold">Assessments</h2>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="relative flex items-center">
                                            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"} w-5 h-5`} />
                                            <input
                                                type="search"
                                                placeholder="Nhập tên nhân viên"
                                                value={searchText}
                                                onChange={handleSearchChange}
                                                className={`py-2 pl-10 pr-4 w-72 rounded-xl border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                                                ref={searchInputRef}
                                            />
                                        </div>
                                        <div className="relative flex items-center">
                                            <FiUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"} w-5 h-5`} />
                                            <select
                                                value={selectedEmployee}
                                                onChange={handleEmployeeChange}
                                                className={`py-2 pl-10 pr-4 w-72 rounded-xl border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                                            >
                                                <option value="">Tất cả nhân viên</option>
                                                {employees.map((employee) => (
                                                    <option key={employee.employeeId} value={employee.employeeId}>
                                                        {employee.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                {assessments?.length > 0 ? (
                                    <div className="space-y-3">
                                        {assessments.map((assessment) => (
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
                                                            <h3
                                                                className={`text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                                                            >
                                                                {assessment?.employeeName} - KPI: {assessment?.kpiName}
                                                            </h3>
                                                            <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                                KPA: {assessment?.kpaName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-sm font-medium ${assessment?.status === "reviewed"
                                                                ? darkMode
                                                                    ? "bg-green-900/50 text-green-400"
                                                                    : "bg-green-100 text-green-700"
                                                                : darkMode
                                                                    ? "bg-yellow-900/50 text-yellow-400"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                        >
                                                            {assessment?.status === "reviewed" ? "Reviewed" : "Pending"}
                                                        </span>
                                                        <span
                                                            className={`text-sm flex items-center gap-1 whitespace-nowrap ${darkMode ? "text-gray-400" : "text-gray-500"}`}
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
                                                            Line Manager: {assessment?.lineManagerName} - {assessment?.lineManagerJobTitle}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <NavLink
                                                            to={`/admin/assessment_details`}
                                                            state={{ assessment: assessment }}
                                                            className={`p-1.5 rounded-md transition-colors ${darkMode
                                                                ? "hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-purple-700/20"
                                                                : "hover:bg-gradient-to-r hover:from-blue-700/10 hover:to-purple-700/10"
                                                                }`}
                                                            title="Details"
                                                        >
                                                            <FiEye className={`w-4 h-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`} />
                                                        </NavLink>
                                                        <button
                                                            onClick={() => handleDelete(assessment?.assessmentId)}
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
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400">Không có assessment nào.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        className={`mx-4 w-16 text-center p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-blue-600/50 text-gray-200" : "bg-white border-blue-600 text-gray-900"}`}
                        ref={inputRef}
                        type="number"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const value = e.target.value > totalPages ? totalPages : e.target.value < 1 ? 1 : e.target.value;
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
    );
};

export default AdminAssessments;