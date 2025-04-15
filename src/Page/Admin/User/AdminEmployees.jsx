import React, { useEffect, useRef, useState } from "react";
import { BsFillCake2Fill } from "react-icons/bs";
import { FiPhone, FiBriefcase, FiMoon, FiSun, FiCheckCircle, FiPlus, FiEdit2, FiTrash2, FiClock, FiCalendar, FiUser } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

const AdminEmployees = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [employees, setEmployees] = useState(null);
    const location = useLocation();
    const inputRef = useRef(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 10;

    useEffect(() => {
        const fetchEmployees = async (page) => {
            try {
                if (inputRef.current) inputRef.current.value = page;
                const response = await fetch(`http://localhost:8080/employees/getAllEmployees?page=${page - 1}&size=${size}`);
                const res = await response.json();
                setEmployees(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchTotalPages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employees/getTotalElements`);
                const res = await response.json();
                setTotalPages(Math.ceil(res.data / size));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchEmployees(currentPage);
        fetchTotalPages();
    }, [currentPage, location]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={`w-full min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Employees
                        </h1>
                        <div className="flex gap-4">
                            <button
                                // onClick={() => setShowAddModal(true)}
                                className={`flex items-center gap-4 px-4 py-3 bg-blue-500 text-white font-medium rounded-xl transition-all duration-300 ${darkMode ? "hover:bg-gray-800" : "hover:bg-blue-700 hover:text-gray-700"
                                    }`}
                            >
                                <FiPlus className="w-5 h-5" />
                                New Employees
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
                        {[
                            { label: "Total employees", value: "1,234", icon: FiUser, color: "blue" },
                            { label: "Active Now", value: "842", icon: FiCheckCircle, color: "green" },
                            { label: "New Today", value: "24", icon: FiPlus, color: "purple" },
                            { label: "Pending", value: "12", icon: FiClock, color: "yellow" }
                        ].map((stat) => (
                            <div key={stat.label} className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                                        <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold">Employees List</h2>
                        </div>
                        <div className="p-4 max-w-7xl mx-auto">
                            <div className="space-y-4">
                                {employees?.map((employee, index) => (
                                    <div
                                        key={employee?.employeeId}
                                        className={`${darkMode ? "bg-gray-950/90" : "bg-white"
                                            } p-5 rounded-xl border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 animate-fade-in`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {/* Gradient Border Overlay */}
                                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/50 rounded-xl pointer-events-none transition-all duration-300"></div>

                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                                            {/* Avatar + Name + Email */}
                                            <div className="flex items-center gap-4">
                                                <div className="relative group/avatar">
                                                    <img
                                                        src={employee?.avatar}
                                                        alt={employee?.name}
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 group-hover/avatar:border-transparent transition-all duration-300"
                                                    />
                                                    <div className="absolute inset-0 rounded-full border-3 border-transparent group-hover/avatar:border-indigo-500 animate-spin-slow"></div>
                                                </div>
                                                <div>
                                                    <h3 className="text-[19px] font-semibold text-gray-900 dark:text-white tracking-tight">
                                                        {employee?.name}
                                                    </h3>
                                                    <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                                                        {employee?.email}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-[13px] text-gray-600 dark:text-gray-300 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700">
                                                <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pr-5 animate-fade-in" style={{ animationDelay: `${100 + index * 50}ms` }}>
                                                    <BsFillCake2Fill className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                                    <span>{new Date(employee?.birthDate).toLocaleDateString('vi-VN', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })}</span>
                                                </div>
                                                <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:px-5 animate-fade-in" style={{ animationDelay: `${150 + index * 50}ms` }}>
                                                    <FiPhone className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-teal-500 transition-colors" />
                                                    <span>{employee?.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-5 animate-fade-in" style={{ animationDelay: `${200 + index * 50}ms` }}>
                                                    <FiBriefcase className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-coral-500 transition-colors" />
                                                    <span>{employee?.jobTitle}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                <NavLink
                                                    to={"/admin/employee_details"}
                                                    state={{ "employee": employee }}
                                                    className="relative p-2.5 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300 group/action focus:ring-2 focus:ring-indigo-500"
                                                    aria-label="Edit user"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover/action:scale-110 transition-transform" />
                                                    <span className="absolute hidden group-hover/action:block top-full mt-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                        Edit
                                                    </span>
                                                </NavLink>
                                                <button
                                                    className="relative p-2.5 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-300 group/action focus:ring-2 focus:ring-red-500"
                                                    aria-label="Delete user"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="w-5 h-5 text-red-500 dark:text-red-400 group-hover/action:scale-110 transition-transform" />
                                                    <span className="absolute hidden group-hover/action:block top-full mt-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                        Delete
                                                    </span>
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

export default AdminEmployees;