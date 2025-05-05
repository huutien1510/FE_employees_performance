import React, { use, useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit, FiCalendar, FiX, FiSun, FiMoon, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const AdminKPI = () => {
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();

    const [showKPIModal, setShowKPIModal] = useState(false);
    const [showKPAModal, setShowKPAModal] = useState(false);
    const [selectedKPI, setSelectedKPI] = useState(null);
    const [selectedKPA, setSelectedKPA] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [expandedKPI, setExpandedKPI] = useState(null);
    const [kpis, setKpis] = useState(null);
    const [kpas, setKpas] = useState(null);


    useEffect(() => {
        const fetchKPI = async () => {
            try {
                const response = await fetch(`http://localhost:8080/kpi/getAllKpi`);
                const res = await response.json();
                setKpis(res.data);
            } catch (error) {
                console.error("Error fetching KPI data:", error);
            }
        };
        fetchKPI();


        const fetchKPA = async () => {
            try {
                const response = await fetch(`http://localhost:8080/kpa/getAllKpa`);
                const res = await response.json();
                setKpas(res.data);
            } catch (error) {
                console.error("Error fetching KPA data:", error);
            }
        };
        fetchKPA();

    }, [location]);



    const handleEditKPI = (kpi) => {
        setSelectedKPI(kpi);
        setEditMode(true);
        setShowKPIModal(true);
    };

    const handleDeleteKPI = async (kpiId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this KPI?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/kpi/deleteKpi/${kpiId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("accountId"),
                    },
                });
                const res = await response.json();
                if (res.data === 1) {
                    setKpis(kpis?.filter((kpi) => kpi.kpiId !== kpiId));
                    alert("Delete KPI successfully");
                } else {
                    alert("Failed to delete KPI");
                }
            } catch (error) {
                console.error("Error deleting KPI:", error);
                alert("An error occurred while deleting KPI");
            }
        }
    };

    const handleAddKPA = (kpiId) => {
        setSelectedKPI(kpis?.find((kpi) => kpi.id === kpiId));
        setEditMode(false);
        setShowKPAModal(true);
    };

    const handleEditKPA = (kpiId, kpa) => {
        setSelectedKPI(kpis?.find((kpi) => kpi.id === kpiId));
        setSelectedKPA(kpa);
        setEditMode(true);
        setShowKPAModal(true);
    };

    const handleDeleteKPA = async (kpaId) => {
        if (!kpaId) {
            alert("Invalid KPA ID");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this KPA?");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/kpa/deleteKpa/${kpaId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("accountId") || "",
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const res = await response.json();
                if (res.data === 1) {
                    setKpas(kpas?.filter((kpa) => kpa.kpaId !== kpaId));
                    alert("Delete KPA successfully");
                } else {
                    alert("Failed to delete KPA");
                }
            } catch (error) {
                console.error("Error deleting KPA:", error);
                alert("An error occurred while deleting KPA");
            }
        }
    };

    const toggleKPIExpansion = (kpiId) => {
        setExpandedKPI(expandedKPI === kpiId ? null : kpiId);
    };

    const KPIModal = ({ isEdit }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`rounded-xl p-6 w-full max-w-md ${darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"
                    } border shadow-lg transition-all duration-300`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{isEdit ? "Edit KPI" : "Add New KPI"}</h2>
                    <button
                        onClick={() => setShowKPIModal(false)}
                        className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Name</label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Description</label>
                        <textarea
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Year</label>
                        <input
                            type="number"
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            min="2015"
                            max={new Date().getFullYear() + 10} // Allow future years
                            placeholder="Enter year"
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Percentage</label>
                        <input
                            type="number"
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowKPIModal(false)}
                            className={`px-4 py-2 border rounded-lg text-sm font-semibold ${darkMode
                                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-200"
                                } transition-colors duration-200`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                        >
                            {isEdit ? "Update" : "Add"} KPI
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const KPAModal = ({ isEdit }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`rounded-xl p-6 w-full max-w-md ${darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"
                    } border shadow-lg transition-all duration-300`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{isEdit ? "Edit KPA" : "Add New KPA"}</h2>
                    <button
                        onClick={() => setShowKPAModal(false)}
                        className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Name</label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Description</label>
                        <textarea
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Percentage</label>
                        <input
                            type="number"
                            className={`w-full border rounded-lg py-2 px-3 text-sm ${darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowKPAModal(false)}
                            className={`px-4 py-2 border rounded-lg text-sm font-semibold ${darkMode
                                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-200"
                                } transition-colors duration-200`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                        >
                            {isEdit ? "Update" : "Add"} KPA
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className={`w-full min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} transition-all duration-300`}>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                KPI & KPA Management
                            </h1>
                            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Monitor and manage key performance indicators and areas</p>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                        >
                            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-between items-center`}>
                            <h2 className="text-xl font-semibold">KPI List</h2>
                            <button
                                onClick={() => {
                                    setEditMode(false);
                                    setShowKPIModal(true);
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center"
                            >
                                <FiPlus className="mr-2 w-5 h-5" />
                                Add New KPI
                            </button>
                        </div>
                        <div className="p-6 max-w-7xl mx-auto">
                            <div className="space-y-6">
                                {kpis?.length > 0 ? (
                                    kpis?.map((kpi) => (
                                        <div
                                            key={kpi.kpiId}
                                            className={`${darkMode ? "bg-gray-950/90" : "bg-white"
                                                } p-6 rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                                        >
                                            {/* KPI Header */}
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1" title={kpi.kpiName}>
                                                        KPI Name: {kpi.kpiName}
                                                    </h3>
                                                    <div className="flex items-center gap-10">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm transition-colors duration-200 bg-yellow-100 text-yellow-700`}
                                                        >
                                                            {kpi.type}
                                                        </span>
                                                        <span
                                                            className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                                                        >
                                                            Percent: {kpi.percent}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditKPI(kpi)}
                                                        className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-indigo-900/50" : "hover:bg-indigo-100"
                                                            }`}
                                                        title="Edit"
                                                    >
                                                        <FiEdit className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-500"}`} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteKPI(kpi.kpiId)}
                                                        className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-red-900/50" : "hover:bg-red-100"
                                                            }`}
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 className={`w-5 h-5 ${darkMode ? "text-red-400" : "text-red-500"}`} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* KPI Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                                                <div className="md:col-span-12">
                                                    <p
                                                        className={`text-sm text-gray-500 dark:text-gray-400 line-clamp-5 mb-6`}
                                                        title={kpi.description}
                                                    >
                                                        Description: {kpi.description}
                                                    </p>
                                                    <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
                                                        <div className="flex items-center gap-2">
                                                            <FiCalendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                                            <span>Year: {kpi.year}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* KPAs Section */}
                                            <div className={`border-t pt-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                                <div className="flex justify-between items-center mb-4">
                                                    <button
                                                        onClick={() => toggleKPIExpansion(kpi.kpiId)}
                                                        className="flex items-center text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                                    >
                                                        KPAs
                                                        {expandedKPI === kpi.kpiId ? (
                                                            <FiChevronUp className="ml-2 w-5 h-5" />
                                                        ) : (
                                                            <FiChevronDown className="ml-2 w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAddKPA(kpi.kpiId)}
                                                        className={`flex items-center text-sm font-semibold ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                                                            } transition-colors duration-200`}
                                                    >
                                                        <FiPlus className="mr-1 w-4 h-4" /> Add KPA
                                                    </button>
                                                </div>
                                                {expandedKPI === kpi.kpiId && (
                                                    <div className="space-y-3">
                                                        {kpas.filter((kpa) => kpa.kpiId === expandedKPI)
                                                            .map((kpa) => (
                                                                <div
                                                                    key={kpa.kpaId}
                                                                    className={`rounded-lg p-3 flex items-center justify-between ${darkMode ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"
                                                                        } border transition-all duration-300 hover:shadow-sm`}
                                                                >
                                                                    <div className="flex-1 flex items-center gap-4">
                                                                        <div className="flex-1">
                                                                            <h4
                                                                                className={`text-sm font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"
                                                                                    } line-clamp-1`}
                                                                                title={kpa.kpaName}
                                                                            >
                                                                                KPA Name: {kpa.kpaName}
                                                                            </h4>
                                                                            <p
                                                                                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
                                                                                    } line-clamp-5`}
                                                                                title={kpa.description}
                                                                            >
                                                                                {kpa.description}
                                                                            </p>
                                                                        </div>
                                                                        <span
                                                                            className={`text-sm font-medium mr-4 ${darkMode ? "text-gray-200" : "text-gray-700"
                                                                                }`}
                                                                        >
                                                                            KPA Percent: {kpa.percent}%
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => handleEditKPA(kpi.kpiId, kpa)}
                                                                            className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-blue-900/50" : "hover:bg-blue-100"
                                                                                }`}
                                                                            title="Edit"
                                                                        >
                                                                            <FiEdit
                                                                                className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-500"
                                                                                    }`}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteKPA(kpa.kpaId)}
                                                                            className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? "hover:bg-red-900/50" : "hover:bg-red-100"
                                                                                }`}
                                                                            title="Delete"
                                                                        >
                                                                            <FiTrash2
                                                                                className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-500"
                                                                                    }`}
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No KPIs available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showKPIModal && <KPIModal isEdit={editMode} />}
            {showKPAModal && <KPAModal isEdit={editMode} />}
        </div>
    );
};

export default AdminKPI;