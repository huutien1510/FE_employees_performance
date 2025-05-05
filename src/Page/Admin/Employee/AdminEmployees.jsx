import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsFillCake2Fill } from "react-icons/bs";
import { FiPhone, FiBriefcase, FiMoon, FiSun, FiPlus, FiEdit2, FiTrash2, FiSearch, FiTarget } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

const AdminEmployees = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [employees, setEmployees] = useState(null);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();
    const inputRef = useRef(null);
    const searchInputRef = useRef(null);
    const employeeBackupRef = useRef(null);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 10;

    useEffect(() => {
        const fetchEmployeesAdmin = async (page) => {
            try {
                if (inputRef.current) inputRef.current.value = page;
                const response = await fetch(`http://localhost:8080/employees/getAllEmployeesAdmin?page=${page - 1}&size=${size}`);
                const res = await response.json();
                employeeBackupRef.current = res.data;
                setEmployees(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchTotalPages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employees/getTotalElements`);
                const res = await response.json();
                setTotalEmployees(res.data);
                setTotalPages(Math.ceil(res.data / size));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchEmployeesAdmin(currentPage);
        fetchTotalPages();
    }, [currentPage, location]);

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
                const response = await fetch(`http://localhost:8080/employees/searchByName?keyword=${encodeURIComponent(keyword)}`);
                const res = await response.json();
                setEmployees(res.data);
            } catch (error) {
                console.error("Search failed:", error);
            }
        } else {
            setEmployees(employeeBackupRef.current);
        }
    };

    const debouncedSearch = useCallback(debounce(performSearch, 1000), []);

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchText(keyword);
        debouncedSearch(keyword);
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
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                            >
                                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-between items-center`}>
                            <h2 className="text-xl font-semibold">Employees List</h2>
                            <div className="relative flex items-center">
                                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                <input
                                    type="search"
                                    placeholder="Nhập tên nhân viên"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    className={`py-2 pl-10 pr-4 w-64 rounded-2xl border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    ref={searchInputRef}
                                />
                            </div>
                        </div>
                        <div className="p-6 max-w-7xl mx-auto">
                            <div className="space-y-6">
                                {employees?.map((employee) => (
                                    <div
                                        key={employee?.employeeId}
                                        className={`${darkMode ? "bg-gray-950/90" : "bg-white"} p-6 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            {/* Cột 1: Avatar, Tên, Email */}
                                            <div className="md:col-span-3 flex items-center gap-4">
                                                <img
                                                    src={employee?.avatar}
                                                    alt={employee?.name}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                                                        {employee?.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                        {employee?.email}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Cột 2: Trạng thái Assessment (có thể click) */}
                                            <div className="md:col-span-4 flex justify-center">
                                                <NavLink
                                                    to={`/admin/assessments`}
                                                    state={{ employee: employee }}
                                                    className="inline-block"
                                                >
                                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                                                        <FiTarget className="w-5 h-5 text-blue-500" />
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                {employee?.reviewed}/{employee?.pending + employee?.reviewed} Assessments
                                                            </span>
                                                            {employee?.pending > 0 ? (
                                                                <span className="text-sm text-orange-500">
                                                                    {employee?.pending} pending
                                                                </span>
                                                            ) : (
                                                                <span className="text-sm text-green-500">All reviewed</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </div>

                                            {/* Cột 3: Thông tin phụ (Ngày sinh, Số điện thoại, Chức vụ) - Trải đều trên cùng một dòng */}
                                            <div className="md:col-span-4 flex flex-row justify-between items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                                                <div className="flex items-center gap-2">
                                                    <BsFillCake2Fill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                    <span>{new Date(employee?.birthDate).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiPhone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                    <span>{employee?.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiBriefcase className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                    <span>{employee?.jobTitle}</span>
                                                </div>
                                            </div>

                                            {/* Cột 4: Nút Edit */}
                                            <div className="md:col-span-1 flex justify-center">
                                                <NavLink
                                                    to={"/admin/employee_details"}
                                                    state={{ employeeId: employee.employeeId }}
                                                    className="p-2.5 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300 group/action focus:ring-2 focus:ring-indigo-500"
                                                    aria-label="Edit user"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover/action:scale-110 transition-transform" />
                                                    <span className="absolute hidden group-hover/action:block top-full mt-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                                        Edit
                                                    </span>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mt-6 mb-8">
                <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className={`mx-4 px-4 py-2 rounded-lg transition-all duration-300 ${darkMode
                    ? "bg-gray-800 border-2 border-blue-600/50 text-gray-200"
                    : "bg-gray-100 border-2 border-blue-600 text-gray-900"}`}>
                    Page
                    <input
                        className={`mx-4 w-16 text-center p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-800 border-blue-600/50 text-gray-200" : "bg-white border-blue-600 text-gray-900"}`}
                        ref={inputRef}
                        type="number"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const value = Math.max(1, Math.min(totalPages, parseInt(e.target.value)));
                                handlePageChange(value);
                            }
                        }}
                    />
                    of {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminEmployees;