import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiEdit2, FiClock, FiMessageSquare, FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

const AdminReviews = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [reviews, setReviews] = useState(null);
    const inputRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [reviewedElements, setReviewedElements] = useState(0);
    const [pendingElements, setPendingElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const size = 10;
    const location = useLocation();
    const searchInputRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const employeesBackupRef = useRef([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchReviews = async (page) => {
            try {
                if (inputRef.current) inputRef.current.value = page;
                const response = await fetch(`http://localhost:8080/reviews/getAllReviews?page=${page - 1}&size=${size}`);
                const res = await response.json();
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchTotalPages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/getTotalElements`);
                const res = await response.json();
                setReviewedElements(res.data.reviewedElements);
                setPendingElements(res.data.pendingElements);
                setTotalElements(res.data.reviewedElements + res.data.pendingElements);
                setTotalPages(Math.ceil((res.data.reviewedElements + res.data.pendingElements) / size));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchReviewsByEmployee = async (employeeId, page) => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/getAllReviewsByLineManager/${employeeId}?page=${page - 1}&size=${size}`);
                const res = await response.json();
                console.log(res.data)
                setReviews(res.data);
            } catch (error) {
                console.error("Search failed:", error);
            }
        };

        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employees/getAllManagerSideBar`);
                const res = await response.json();
                setEmployees(res.data);
                employeesBackupRef.current = res.data;
            } catch (error) {
                console.error("Search failed:", error);
            }
        }

        fetchEmployee();
        setSearchText("");

        if (selectedEmployee) {
            setReviewedElements(selectedEmployee.reviewed);
            setPendingElements(selectedEmployee.pending);
            setTotalElements(selectedEmployee.reviewed + selectedEmployee.pending);
            setTotalPages(Math.ceil((selectedEmployee.reviewed + selectedEmployee.pending) / size));
            fetchReviewsByEmployee(selectedEmployee.employeeId, currentPage);
        } else {
            fetchReviews(currentPage);
            fetchTotalPages();
        }

    }, [currentPage, location, selectedEmployee]);

    const statsData = [
        { label: "Total Reviews", value: totalElements, icon: FiMessageSquare, color: "blue" },
        { label: "Reviewed", value: reviewedElements, icon: FiCheckCircle, color: "purple" },
        { label: "Pending", value: pendingElements, icon: FiClock, color: "yellow" },
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                // Lọc các nhân viên có tên chứa keyword (không phân biệt chữ hoa chữ thường)
                const filteredEmployees = employeesBackupRef.current?.filter(employee =>
                    employee.name.toLowerCase().includes(keyword.toLowerCase())
                );
                setEmployees(filteredEmployees); // Cập nhật danh sách kết quả tìm kiếm
            } catch (error) {
                console.error("Search failed:", error);
            }
        } else {
            // Nếu không có keyword, hiển thị danh sách ban đầu
            setEmployees(employeesBackupRef.current);
        }
    };


    const debouncedSearch = useCallback(debounce(performSearch, 100), []);

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchText(keyword);
        debouncedSearch(keyword);
    };



    return (
        <div className={`w-full min-h-screen ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"} transition-colors duration-300 flex justify-center`}>
            <div
                style={{
                    transform: "scale(0.9)",
                    transformOrigin: "center top",
                    width: "111.11%",
                }}
            >
                <div className="w-full flex gap-16 justify-center ml-20 ">
                    {/* Main Content */}
                    <div className="w-3/4">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mt-8">
                                    Assessment's Review
                                </h1>
                                <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Manage and monitor assessment quality feedback
                                </p>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                            >
                                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>
                        </div>
                        <span className="block text-xl font-bold text-left mb-5">{`Result for: ${selectedEmployee?.name || "All Employees"}`}</span>

                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {statsData.map((stat) => (
                                <div
                                    key={stat.label}
                                    className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
                                            <p className={`text-2xl font-bold mt-1 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>{stat.value}</p>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg ${darkMode ? `bg-${stat.color}-900/20` : `bg-${stat.color}-100`} transition-colors duration-200`}
                                        >
                                            <stat.icon
                                                className={`w-6 h-6 ${darkMode ? `text-${stat.color}-400` : `text-${stat.color}-500`}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Review List Section */}
                        <div
                            className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"} rounded-xl border shadow-sm transition-colors duration-300`}
                        >
                            <div className={`p-6 border-b ${darkMode ? "border-gray-600" : "border-gray-200"} flex items-center justify-between`}>
                                <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                    Assessment Review List
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {reviews?.map((review) => (
                                        <div
                                            key={review?.reviewId}
                                            className={`${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"} p-6 rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                                        >
                                            {/* Header Section: Employee Name, KPI, and Status */}
                                            <div className="flex justify-between items-center mb-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                                                            {review?.employeeName}
                                                        </h3>
                                                        <span className={`text-xl font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                            - {review?.kpiName}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                            KPA: {review?.kpaName}
                                                        </span>
                                                        <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                            • Employee Evaluate: {review?.employeeEvaluate ? `${review.employeeEvaluate}%` : "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span
                                                        className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase shadow-sm transition-colors duration-200 ${review?.status === "reviewed"
                                                            ? darkMode
                                                                ? "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                                                                : "bg-green-100 text-green-700 hover:bg-green-200"
                                                            : darkMode
                                                                ? "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50"
                                                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`}
                                                    >
                                                        {review?.status === "reviewed" ? "Reviewed" : "Pending"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Evaluation and Comments Section */}
                                            <div className="mb-6 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-bold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                        Manager Evaluate: {review?.evaluate ? `${review.evaluate}%` : "Awaiting Evaluation"}
                                                    </span>
                                                </div>
                                                <span className={`text-sm font-bold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                    Manager Comments:
                                                </span>
                                                <p
                                                    className={`text-sm leading-relaxed p-3 rounded-lg ${darkMode ? "text-gray-400 bg-gray-700/50" : "text-gray-600 bg-gray-50"}`}
                                                >
                                                    {review?.comments || "No comments provided."}
                                                </p>
                                            </div>

                                            {/* Footer Section: Reviewer Info and Actions */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={review?.lineManagerAvatar}
                                                        alt="reviewer"
                                                        className={`w-8 h-8 rounded-full border-2 ${darkMode ? "border-gray-600" : "border-gray-200"}`}
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                            Reviewed by {review?.lineManagerName || "Unknown"}
                                                        </span>
                                                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                            •{" "}
                                                            {review?.updatedAt
                                                                ? new Date(review?.updatedAt).toLocaleDateString("vi-VN", {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })
                                                                : "Awaiting Evaluation"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <NavLink
                                                        to={"/admin/review_details"}
                                                        state={{ review: review }}
                                                        className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-blue-900/50" : "hover:bg-blue-100"}`}
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pagination Section */}
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
                                        : "bg-gray-100 border-2 border-blue-600 text-gray-900 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10"}`}
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
                    </div>

                    {/* Employee Sidebar */}
                    <div
                        className={`mt-10 w-1/4 ${darkMode ? "bg-gray-950 text-gray-300" : "bg-gray-50 text-gray-700"} transition-colors duration-300`}
                    >
                        <div className="p-3">
                            <h2 className={`text-xl font-semibold mb-6 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                                Manager List
                            </h2>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"} w-4 h-4`} />
                                    <input
                                        type="search"
                                        placeholder="Nhập tên nhân viên"
                                        value={searchText}
                                        onChange={handleSearchChange}
                                        className={`py-2 pl-9 pr-3 w-80 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                                        ref={searchInputRef}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 max-h-[calc(345vh-16rem)] overflow-y-auto">
                                <div
                                    key={0}
                                    className={`p-4 rounded-lg ${selectedEmployee === null ? (darkMode ? "bg-gray-700" : "bg-gray-300") : "bg-transparent"} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"} transition-all duration-300 cursor-pointer hover:shadow-sm`}
                                    onClick={() => setSelectedEmployee(null)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} transition-colors duration-200`}>
                                            All Manager
                                        </span>
                                    </div>
                                </div>
                                {employees?.length > 0 ? (
                                    employees.map((employee) => (
                                        <div
                                            key={employee.employeeId}
                                            className={`p-4 rounded-lg ${selectedEmployee?.name === employee.name ? (darkMode ? "bg-gray-700" : "bg-gray-300") : "bg-transparent"} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"} transition-all duration-300 cursor-pointer hover:shadow-sm`}
                                            onClick={() => setSelectedEmployee(employee)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className={`text-sm font-medium ${darkMode ? "text-gray-200 hover:text-blue-400" : "text-gray-800 hover:text-blue-600"} transition-colors duration-200`}>
                                                    {employee.name}
                                                </span>
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${employee.pending === 0
                                                        ? darkMode
                                                            ? "bg-green-900/30 text-green-400"
                                                            : "bg-green-100 text-green-700"
                                                        : darkMode
                                                            ? "bg-yellow-900/30 text-yellow-400"
                                                            : "bg-yellow-100 text-yellow-700"}`}
                                                >
                                                    {employee.pending === 0 ? `Reviewed: ${employee.reviewed}/${employee.pending + employee.reviewed}` : `Pending: ${employee.pending}/${employee.pending + employee.reviewed}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        No employees available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReviews;