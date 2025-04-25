import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, FiHash, FiClock, FiEdit2, FiFilter, FiAward, FiBarChart2, FiPieChart, FiUsers, FiInfo } from "react-icons/fi";
import { useLocation } from "react-router-dom";


const EmployeeDetails = () => {
    const location = useLocation();
    const employeeId = location.state?.employeeId;
    const [employee, setEmployee] = useState(null);
    const [years, setYears] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [overall, setOverall] = useState(0);
    const [kpis, setKpis] = useState(null);
    const [kpas, setKpas] = useState(null);
    const [selectedKPI, setSelectedKPI] = useState(null);
    const [kpiEvaluation, setKpiEvaluation] = useState({});

    useEffect(() => {
        const fetchKPI = async (selectedYear) => {
            try {
                const response = await fetch(`http://localhost:8080/kpi/getKpiByYear/${selectedYear}`);
                const res = await response.json();
                setKpis(res.data);
                setSelectedKPI(res?.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchOverallPerformanceByYear = async (selectedYear) => {
            try {
                const response = await fetch(`http://localhost:8080/reviews/getOverallPerformanceByYear/${employeeId}/${selectedYear}`);
                const res = await response.json();
                if (res.data) setOverall(res.data);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchOverallPerformanceByYear(selectedYear);


        if (selectedYear) {
            fetchKPI(selectedYear);
            fetchOverallPerformanceByYear(selectedYear);
        }

    }, [selectedYear]);


    useEffect(() => {
        const fetchKPA = async (selectedKPI) => {
            try {
                const response = await fetch(`http://localhost:8080/kpa/getKPAByKpiYear/${selectedKPI?.kpiId || 0}/${employeeId}`);
                const res = await response.json();
                setKpas(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchKPA(selectedKPI);

    }, [selectedKPI]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employees/getEmployeeById/${employeeId}`);
                const res = await response.json();
                setEmployee(res.data);
                setYears(Array.from(
                    { length: (res.data.endDate ? new Date(res.data.endDate)?.getFullYear() : new Date().getFullYear()) - new Date(res.data.startDate).getFullYear() + 1 },
                    (_, i) => new Date(res.data.startDate).getFullYear() + i
                ));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchEmployees();

    }, []);


    useEffect(() => {
        if (!kpis || kpis.length === 0) return;

        const fetchAllEvaluations = async () => {
            // Chạy song song tất cả các fetch, lấy về mảng [ [kpiId, evaluation], ... ]
            const entries = await Promise.all(
                kpis.map(async (kpi) => {
                    const response = await fetch(
                        `http://localhost:8080/kpi/getEvaluationByKpi/${kpi.kpiId}/${employeeId}`
                    );
                    const res = await response.json();
                    return [kpi.kpiId, res.data ?? 0];
                })
            );

            // Chuyển mảng entries thành object { kpiId: evaluation, ... }
            const evalMap = Object.fromEntries(entries);

            // Cập nhật state chỉ một lần
            setKpiEvaluation(evalMap);

            // Debug: bây giờ mới log chắc chắn có dữ liệu
            console.log("KPI evaluations:", evalMap);
        };

        fetchAllEvaluations();
    }, [kpis]);



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
                                    onChange={(e) => {
                                        setSelectedYear(Number(e.target.value));
                                        setSelectedKPI(0);
                                    }}
                                    className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {years?.map(year => (
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
                                <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-lg mb-4">
                                    <FiInfo className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-blue-700">
                                        Click on any KPI to view its specific KPAs in the overview section
                                    </span>
                                </div>
                                {kpis?.map(kpi => (
                                    <div
                                        key={kpi?.kpiId}
                                        className={`mb-4 cursor-pointer transition-all duration-300 p-3 rounded-lg ${selectedKPI?.kpiId === kpi?.kpiId ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                                        onClick={() => setSelectedKPI(kpi)}
                                    >
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">{kpi?.kpiName}</span>
                                            <span className="font-semibold text-blue-700">{kpiEvaluation[kpi?.kpiId]} /100 %</span>
                                        </div>
                                        <div className="w-full bg-blue-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                                                style={{ width: `${kpiEvaluation[kpi?.kpiId]}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 italic bg-purple-50 p-2 rounded-lg">
                                            {kpi?.type} - accounts for {kpi?.percent}%
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-purple-700">
                                        {kpas ? `KPAs for ${selectedKPI?.kpiName}` : 'Overall KPA Overview'}
                                    </h3>
                                    <FiAward className="w-6 h-6 text-purple-500" />
                                </div>
                                {kpas?.map(kpa => (
                                    <div key={kpa?.kpaId} className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">{kpa?.kpaName}</span>
                                            <span className="font-semibold text-purple-700">{kpa?.evaluate > 100 ? 100 : (kpa?.evaluate < 0 ? 0 : kpa?.evaluate) || 0} /100%</span>
                                        </div>
                                        <div className="w-full bg-purple-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                                                style={{ width: `${kpa?.evaluate > 100 ? 100 : (kpa?.evaluate < 0 ? 0 : kpa?.evaluate) || 0}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 italic bg-purple-50 p-2 rounded-lg">
                                            Accounts for {kpa?.percent}% of the overall KPI evaluation
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-green-700 mb-4">Overall Performance Score</h3>

                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">
                                    {overall}%
                                </div>
                                <div className="text-sm text-gray-600">Average KPI Score</div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;