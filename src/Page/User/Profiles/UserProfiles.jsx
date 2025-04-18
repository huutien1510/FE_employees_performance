import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, FiHash, FiClock, FiEdit2, FiFilter, FiAward, FiBarChart2, FiPieChart, FiUsers } from "react-icons/fi";

const initialPerformanceData = {
    2023: {
        kpis: [
            { id: 1, name: "Project Delivery", target: 100, achieved: 95, score: 9.5 },
            { id: 2, name: "Code Quality", target: 100, achieved: 90, score: 9.0 },
            { id: 3, name: "Team Collaboration", target: 100, achieved: 98, score: 9.8 },
        ],
        kpas: [
            { id: 1, name: "Leadership Skills", rating: 9.2, comments: "Excellent leadership qualities" },
            { id: 2, name: "Innovation", rating: 8.8, comments: "Consistently brings new ideas" },
            { id: 3, name: "Communication", rating: 9.5, comments: "Outstanding communication skills" },
        ],
    },
    2022: {
        kpis: [
            { id: 1, name: "Project Delivery", target: 100, achieved: 92, score: 9.2 },
            { id: 2, name: "Code Quality", target: 100, achieved: 88, score: 8.8 },
            { id: 3, name: "Team Collaboration", target: 100, achieved: 95, score: 9.5 },
        ],
        kpas: [
            { id: 1, name: "Leadership Skills", rating: 8.8, comments: "Good leadership progress" },
            { id: 2, name: "Innovation", rating: 8.5, comments: "Shows creative thinking" },
            { id: 3, name: "Communication", rating: 9.0, comments: "Effective communicator" },
        ],
    },
};

const UserProfiles = () => {
    const accountId = localStorage.getItem("accountID");
    const [employee, setEmployee] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2023);
    const years = Object.keys(initialPerformanceData).map(Number);
    const [performanceData] = useState(initialPerformanceData);

    const calculateAverages = (year) => {
        const data = performanceData[year];
        const kpiAvg = data.kpis.reduce((acc, kpi) => acc + kpi.score, 0) / data.kpis.length;
        const kpaAvg = data.kpas.reduce((acc, kpa) => acc + kpa.rating, 0) / data.kpas.length;
        return { kpiAvg, kpaAvg };
    };

    useEffect(() => {
        const fetchAssessmentById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employees/getEmployeeById/${accountId}`);
                const res = await response.json();
                setEmployee(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAssessmentById();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl p-8">
                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 backdrop-blur-lg bg-opacity-90">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <img className="w-full h-full rounded-2xl" src={employee?.avatar} alt="Avatar" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-800 mb-2">{employee?.name}</h1>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <span className="flex text-lg items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full text-indigo-700 hover:bg-indigo-200 transition-colors duration-300">
                                        <FiBriefcase className="w-4 h-4" />
                                        {employee?.jobTitle}
                                    </span>
                                    <span className="flex text-lg items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-purple-700 hover:bg-purple-200 transition-colors duration-300">
                                        <FiHash className="w-4 h-4" />
                                        ID: {employee?.employeeId}
                                    </span>
                                    <span className="flex text-lg items-center gap-2 bg-pink-100 px-4 py-2 rounded-full text-pink-700 hover:bg-pink-200 transition-colors duration-300">
                                        <FiUsers className="w-4 h-4" />
                                        {employee?.departmentName}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex text-lg items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                        <FiMail className="w-4 h-4" />
                                        Email: {employee?.email}
                                    </div>
                                    <div className="flex text-lg items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                        <FiPhone className="w-4 h-4" />
                                        Phone: {employee?.phone}
                                    </div>
                                    <div className="flex text-lg items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                        <FiCalendar className="w-4 h-4" />
                                        Birth Date: {employee?.birthDate &&
                                            new Date(employee.birthDate).toLocaleDateString("vi-VN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
                                <FiUsers className="w-5 h-5" />
                                Line Manager Information
                            </h3>
                            <div className="bg-white p-6 rounded-xl shadow-sm w-full">
                                <div className="flex items-center justify-between gap-4 w-full">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
                                                <img className="w-full h-full rounded-2xl" src={employee?.lineManagerAvatar} alt="LineManagerAvatar" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-gray-800 text-lg">{employee?.lineManagerName}</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 rounded-full">
                                        <FiBriefcase className="w-4 h-4 text-indigo-600" />
                                        <p className="text-indigo-600 font-medium">{employee?.lineManagerJobTitle}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                        <FiMail className="w-5 h-5 text-indigo-600" />
                                        <a href={`mailto:${employee?.lineManagerMail}`} className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium">
                                            {employee?.lineManagerMail}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FiBarChart2 className="w-6 h-6 text-blue-500" />
                                Performance Dashboard
                            </h2>
                            <div className="flex items-center gap-4">
                                <FiFilter className="w-5 h-5 text-gray-500" />
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-blue-700">KPI Overview</h3>
                                    <FiPieChart className="w-6 h-6 text-blue-500" />
                                </div>
                                {performanceData[selectedYear].kpis.map((kpi) => (
                                    <div key={kpi.id} className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">{kpi.name}</span>
                                            <span className="font-semibold text-blue-700">{kpi.score}/10</span>
                                        </div>
                                        <div className="w-full bg-blue-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                                                style={{ width: `${(kpi.achieved / kpi.target) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-purple-700">KPA Overview</h3>
                                    <FiAward className="w-6 h-6 text-purple-500" />
                                </div>
                                {performanceData[selectedYear].kpas.map((kpa) => (
                                    <div key={kpa.id} className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">{kpa.name}</span>
                                            <span className="font-semibold text-purple-700">{kpa.rating}/10</span>
                                        </div>
                                        <div className="w-full bg-purple-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                                                style={{ width: `${(kpa.rating / 10) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-green-700 mb-4">Overall Performance Score</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">
                                        {calculateAverages(selectedYear).kpiAvg.toFixed(1)}
                                    </div>
                                    <div className="text-sm text-gray-600">Average KPI Score</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">
                                        {calculateAverages(selectedYear).kpaAvg.toFixed(1)}
                                    </div>
                                    <div className="text-sm text-gray-600">Average KPA Score</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfiles;